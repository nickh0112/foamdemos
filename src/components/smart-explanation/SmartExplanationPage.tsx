import { useState, useEffect, useCallback } from 'react'
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
import SkepticismPopover from './SkepticismPopover'
import FollowerGrowthChart from './FollowerGrowthChart'
import DemographicsRow from './DemographicsRow'
import RecentActivity from './RecentActivity'
import HealthScoreCard from './HealthScoreCard'
import ThinkingPopover from './ThinkingPopover'
import FoamAssistPanel from './FoamAssistPanel'

export type FlowState = 'base' | 'thinking' | 'explanation' | 'deeper'

export default function SmartExplanationPage() {
  const [flowState, setFlowState] = useState<FlowState>('base')

  useEffect(() => {
    document.title = 'Smart Explanation — Foam Prototypes'
  }, [])

  useEffect(() => {
    if (flowState === 'thinking') {
      const timer = setTimeout(() => setFlowState('explanation'), 2000)
      return () => clearTimeout(timer)
    }
  }, [flowState])

  const handleAskFoam = useCallback(() => {
    if (flowState === 'base') {
      setFlowState('thinking')
    }
  }, [flowState])

  const handleGoDeeper = useCallback(() => {
    if (flowState === 'explanation') {
      setFlowState('deeper')
    }
  }, [flowState])

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
            <MetricStrip flowState={flowState} />

            <AnimatePresence>
              {flowState === 'thinking' && (
                <ThinkingPopover key="thinking" />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(flowState === 'explanation' || flowState === 'deeper') && (
                <SkepticismPopover
                  key="skepticism"
                  flowState={flowState}
                  onGoDeeper={handleGoDeeper}
                />
              )}
            </AnimatePresence>

            <FollowerGrowthChart />
            <DemographicsRow />
            <RecentActivity />
          </div>

          {/* Right column — outside the scroll, fills remaining viewport height */}
          <div
            className={`shrink-0 py-5 pl-0 pr-5 flex flex-col transition-all duration-300 ${
              flowState === 'deeper' ? 'w-[360px]' : 'w-[330px]'
            }`}
          >
            <AnimatePresence mode="wait">
              {flowState !== 'deeper' ? (
                <HealthScoreCard key="health" />
              ) : (
                <FoamAssistPanel key="assist" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
