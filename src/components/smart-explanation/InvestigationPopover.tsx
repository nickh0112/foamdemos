import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { metricExplanations, type MetricKey } from '../../data/smart-explanation'
import InvestigationStep from '../shared/InvestigationStep'

interface Props {
  metric: MetricKey
  onDone: () => void
}

const headerLabels: Record<MetricKey, string> = {
  engagement: 'Investigating Engagement Rate',
  reach: 'Investigating Story Reach',
  growth: 'Investigating Follower Growth',
  views: 'Investigating Story Views',
}

export default function InvestigationPopover({ metric, onDone }: Props) {
  const steps = metricExplanations[metric].investigationSteps
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedSet, setCompletedSet] = useState<Set<number>>(new Set())

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let cumulative = 0

    steps.forEach((step, i) => {
      timers.push(setTimeout(() => setActiveIndex(i), cumulative))

      cumulative += step.delay

      timers.push(
        setTimeout(() => {
          setCompletedSet((prev) => new Set(prev).add(i))
        }, cumulative)
      )

      cumulative += 100
    })

    // Call onDone after all steps complete + brief pause
    timers.push(setTimeout(onDone, cumulative + 200))

    return () => timers.forEach(clearTimeout)
  }, [steps, onDone])

  function getStatus(i: number): 'pending' | 'active' | 'complete' {
    if (completedSet.has(i)) return 'complete'
    if (i === activeIndex) return 'active'
    return 'pending'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="rounded-[10px] bg-bg-card border border-[#8b5cf650] p-4 flex flex-col gap-2"
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
        <span className="text-[13px] font-semibold text-brand-purple">{headerLabels[metric]}</span>
      </div>

      {steps.map((step, i) => (
        <InvestigationStep
          key={i}
          text={step.text}
          result={step.result}
          status={getStatus(i)}
        />
      ))}
    </motion.div>
  )
}
