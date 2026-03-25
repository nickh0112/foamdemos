import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { ThinkingStep } from '../../data/creators'
import InvestigationStep from '../shared/InvestigationStep'

interface Props {
  steps: ThinkingStep[]
  onStepComplete: (step: ThinkingStep, index: number) => void
  onAllComplete: () => void
}

export default function ThinkingPanel({ steps, onStepComplete, onAllComplete }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [completedSet, setCompletedSet] = useState<Set<number>>(new Set())
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    let cumulative = 0

    steps.forEach((step, i) => {
      // Activate step
      timers.push(setTimeout(() => setActiveIndex(i), cumulative))

      cumulative += step.delay

      // Complete step + fire callback
      timers.push(
        setTimeout(() => {
          setCompletedSet((prev) => new Set(prev).add(i))
          onStepComplete(step, i)
        }, cumulative)
      )

      cumulative += 100
    })

    // All done after brief pause
    timers.push(setTimeout(onAllComplete, cumulative + 200))

    timersRef.current = timers
    return () => timers.forEach(clearTimeout)
  }, [steps, onStepComplete, onAllComplete])

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
        <span className="text-[13px] font-semibold text-brand-purple">Analyzing query</span>
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
