import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { metricExplanations, type MetricKey } from '../../data/smart-explanation'

interface Props {
  transitionMetric?: MetricKey | null
}

const MESSAGE = "Click on any metric below — I'll show you exactly how it's calculated."
const CHAR_DELAY = 18 // ms per character

export default function MetricSelectorPopover({ transitionMetric }: Props) {
  const [charCount, setCharCount] = useState(0)
  const [typingDone, setTypingDone] = useState(false)

  useEffect(() => {
    if (transitionMetric) return // pause typing during transition
    if (charCount >= MESSAGE.length) {
      setTypingDone(true)
      return
    }
    const timer = setTimeout(() => setCharCount((c) => c + 1), CHAR_DELAY)
    return () => clearTimeout(timer)
  }, [charCount, transitionMetric])

  const transitionText = transitionMetric
    ? `Let me look into ${metricExplanations[transitionMetric].label}...`
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex items-center gap-2.5 px-1"
    >
      <motion.div
        animate={{ rotate: [0, 12, -12, 8, -8, 0] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-purple shrink-0" />
      </motion.div>

      <AnimatePresence mode="wait">
        {transitionText ? (
          <motion.span
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-[13px] text-[#c4b5fd]"
          >
            {transitionText}
          </motion.span>
        ) : (
          <motion.span
            key="typewriter"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[13px] text-[#c4b5fd]"
          >
            {MESSAGE.slice(0, charCount)}
            {!typingDone && <span className="typing-cursor" />}
            {typingDone && <span className="typing-cursor" />}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
