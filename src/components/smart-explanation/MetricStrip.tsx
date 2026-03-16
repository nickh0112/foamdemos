import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { metricsData } from '../../data/smart-explanation'
import type { FlowState } from './SmartExplanationPage'
import type { MetricKey } from '../../data/smart-explanation'

interface MetricStripProps {
  flowState: FlowState
  selectedMetric: MetricKey | null
  onSelectMetric: (metric: MetricKey) => void
}

const metrics = [
  { ...metricsData.engagement, key: 'engagement' as MetricKey },
  { ...metricsData.reach, key: 'reach' as MetricKey },
  { ...metricsData.views, key: 'views' as MetricKey },
]

const GLOW_DELAYS = [800, 1100, 1400] // staggered glow timing

export default function MetricStrip({ flowState, selectedMetric, onSelectMetric }: MetricStripProps) {
  const isSelectable = flowState === 'selecting' || flowState === 'investigating' || flowState === 'explanation' || flowState === 'deeper'
  const isPrompting = flowState === 'selecting'
  const [activeGlowIndices, setActiveGlowIndices] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (!isPrompting) {
      setActiveGlowIndices(new Set())
      return
    }

    const timers = GLOW_DELAYS.map((delay, i) =>
      setTimeout(() => {
        setActiveGlowIndices((prev) => new Set(prev).add(i))
      }, delay)
    )

    return () => timers.forEach(clearTimeout)
  }, [isPrompting])

  return (
    <div className="rounded-[10px] bg-bg-card border border-border-card flex items-center shrink-0">
      {metrics.map((metric, i) => {
        const isClickable = isSelectable
        const isSelected = metric.key === selectedMetric
        const hasGlow = activeGlowIndices.has(i)

        return (
          <div key={metric.label} className="flex-1 flex items-center">
            {i > 0 && <div className="w-px h-10 bg-border-card shrink-0" />}
            <motion.div
              animate={{
                borderColor: isSelected
                  ? 'rgba(139, 92, 246, 0.5)'
                  : hasGlow
                    ? 'rgba(139, 92, 246, 0.3)'
                    : 'rgba(139, 92, 246, 0)',
                backgroundColor: isSelected
                  ? 'rgba(139, 92, 246, 0.05)'
                  : 'rgba(139, 92, 246, 0)',
              }}
              transition={{ duration: 0.25 }}
              onClick={isClickable ? () => onSelectMetric(metric.key) : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-3.5 px-5 border-2 border-transparent rounded-lg m-0.5 transition-colors ${
                isClickable
                  ? 'cursor-pointer hover:bg-[rgba(139,92,246,0.05)]'
                  : ''
              } ${hasGlow ? 'glow-pulse' : ''}`}
            >
              <span className="text-[10px] text-text-tertiary">{metric.sublabel}</span>
              <span className="text-[20px] font-bold text-text-primary leading-tight">{metric.value}</span>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
