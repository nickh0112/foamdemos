import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import Sidebar from '../shared/Sidebar'
import SearchBar from '../shared/SearchBar'
import StatsBar from './StatsBar'
import TabBar from './TabBar'
import PlatformTabs from './PlatformTabs'
import ProfileCard from './ProfileCard'
import FollowersCard from './FollowersCard'
import BioCard from './BioCard'
import MetricStrip from './MetricStrip'
import MetricSelectorPopover from './MetricSelectorPopover'
import InvestigationPopover from './InvestigationPopover'
import ExplanationCard from './ExplanationCard'
import FollowerGrowthChart from './FollowerGrowthChart'
import DemographicsRow from './DemographicsRow'
import RecentActivity from './RecentActivity'
import HealthScoreCard from './HealthScoreCard'
import FoamAssistPanel from './FoamAssistPanel'
import type { MetricKey } from '../../data/smart-explanation'

export type FlowState = 'base' | 'arrival' | 'selecting' | 'investigating' | 'explanation' | 'deeper'

export default function SmartExplanationPage() {
  const [flowState, setFlowState] = useState<FlowState>('base')
  const [selectedMetric, setSelectedMetric] = useState<MetricKey | null>(null)
  const [transitionMetric, setTransitionMetric] = useState<MetricKey | null>(null)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    document.title = 'Smart Explanation — Foam Prototypes'
  }, [])

  // Mount → 1.5s → arrival (ambient CTA pulse)
  useEffect(() => {
    const timer = setTimeout(() => setFlowState('arrival'), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [])

  const handleAskFoam = useCallback(() => {
    if (flowState === 'base' || flowState === 'arrival') {
      setFlowState('selecting')
    }
  }, [flowState])

  const handleSelectMetric = useCallback((metric: MetricKey) => {
    if (flowState === 'selecting') {
      // Show transition message, then move to investigating after delay
      setTransitionMetric(metric)
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = setTimeout(() => {
        setSelectedMetric(metric)
        setTransitionMetric(null)
        setFlowState('investigating')
      }, 700)
    } else {
      // Already past selecting — switch immediately
      setSelectedMetric(metric)
      setFlowState('investigating')
    }
  }, [flowState])

  const handleInvestigationDone = useCallback(() => {
    setFlowState('explanation')
  }, [])

  const handleSwitchMetric = useCallback((metric: MetricKey) => {
    setSelectedMetric(metric)
    setFlowState('investigating')
  }, [])

  const [sidebarQuestion, setSidebarQuestion] = useState<string | null>(null)

  const handleAskQuestion = useCallback((question?: string) => {
    setSidebarQuestion(question ?? null)
    setFlowState('deeper')
  }, [])

  // Show selector popover during selecting state OR while transition is active
  const showSelectorPopover = flowState === 'selecting' || transitionMetric !== null

  return (
    <div className="flex h-screen overflow-hidden bg-bg-app">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <SearchBar />
        <StatsBar />
        <TabBar />

        {/* Content area: scrollable middle + fixed-height right column */}
        <div className="flex-1 flex overflow-hidden">
          {/* Scrollable middle column */}
          <div className="flex-1 overflow-y-auto py-5 pl-5 pr-3 flex flex-col gap-4 min-w-0">
            {/* TopRow: LeftSubCol + BioCard side by side */}
            <div className="flex gap-4">
              <div className="w-80 shrink-0 flex flex-col gap-4">
                <ProfileCard />
                <FollowersCard />
              </div>
              <div className="flex-1 min-w-0">
                <BioCard />
              </div>
            </div>

            <PlatformTabs flowState={flowState} onAskFoam={handleAskFoam} />

            <AnimatePresence>
              {showSelectorPopover && (
                <MetricSelectorPopover key="selecting" transitionMetric={transitionMetric} />
              )}
            </AnimatePresence>

            <MetricStrip
              flowState={flowState}
              selectedMetric={selectedMetric}
              onSelectMetric={handleSelectMetric}
            />

            <AnimatePresence mode="wait">
              {flowState === 'investigating' && selectedMetric && (
                <InvestigationPopover
                  key={`investigating-${selectedMetric}`}
                  metric={selectedMetric}
                  onDone={handleInvestigationDone}
                />
              )}
              {(flowState === 'explanation' || flowState === 'deeper') && selectedMetric && (
                <ExplanationCard
                  key={`explanation-${selectedMetric}`}
                  metric={selectedMetric}
                  onSwitchMetric={handleSwitchMetric}
                  onAskQuestion={handleAskQuestion}
                />
              )}
            </AnimatePresence>

            <FollowerGrowthChart
              isSelectable={flowState === 'selecting' || flowState === 'investigating' || flowState === 'explanation' || flowState === 'deeper'}
              isSelected={selectedMetric === 'growth'}
              isPrompting={flowState === 'selecting'}
              glowDelay={1700}
              onSelect={() => handleSelectMetric('growth')}
            />
            <DemographicsRow />
            <RecentActivity />
          </div>

          {/* Right column — HealthScoreCard or FoamAssistPanel */}
          <div className={`${flowState === 'deeper' ? 'w-[360px]' : 'w-[330px]'} shrink-0 py-5 pl-0 pr-5 flex flex-col transition-all duration-300`}>
            <AnimatePresence mode="wait">
              {flowState === 'deeper' ? (
                <FoamAssistPanel key="foam-assist" metric={selectedMetric} suggestedQuestion={sidebarQuestion} />
              ) : (
                <HealthScoreCard key="health-score" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
