import { motion } from 'framer-motion'
import { Calculator, BarChart3, Sparkles } from 'lucide-react'
import { metricExplanations, type MetricKey } from '../../data/smart-explanation'

const allMetricKeys: MetricKey[] = ['engagement', 'reach', 'growth', 'views']

const sectionIcons: Record<string, typeof Calculator> = {
  formula: Calculator,
  breakdown: BarChart3,
}

interface Props {
  metric: MetricKey
  onSwitchMetric: (metric: MetricKey) => void
  onAskQuestion: (question?: string) => void
}

export default function ExplanationCard({ metric, onSwitchMetric, onAskQuestion }: Props) {
  const data = metricExplanations[metric]
  const { explanation } = data
  const otherMetrics = allMetricKeys.filter((k) => k !== metric)

  const sectionDelays = [0, 0.15, 0.3, 0.45, 0.6]

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      className="rounded-[10px] bg-bg-card border border-[#8b5cf650] p-4 flex flex-col gap-2.5"
    >
      {/* Hook */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelays[0], duration: 0.3 }}
        className="flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-brand-purple shrink-0" />
        <span className="text-[13px] font-semibold text-text-primary">{explanation.hook}</span>
      </motion.div>

      {/* Sections */}
      {explanation.sections.map((section, i) => {
        const delay = sectionDelays[Math.min(i + 1, sectionDelays.length - 1)]

        if (section.type === 'formula' || section.type === 'breakdown') {
          const Icon = sectionIcons[section.type] || Calculator
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.3 }}
              className="flex items-center gap-2 rounded-lg bg-bg-card-hover px-3 py-2"
            >
              <Icon className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
              <span className="text-[11px] text-text-secondary">{section.text}</span>
            </motion.div>
          )
        }

        if (section.type === 'source') {
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.3 }}
              className="flex items-center gap-2 px-1"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
              <span className="text-[11px] text-text-secondary">{section.text}</span>
            </motion.div>
          )
        }

        // insight
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="flex items-center gap-2 rounded-lg bg-brand-purple/5 px-3 py-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shrink-0 mt-0.5 self-start" />
            <span className="text-[11px] text-text-secondary leading-relaxed">{section.text}</span>
          </motion.div>
        )
      })}

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="h-px bg-border-card"
      />

      {/* Suggested question — opens sidebar */}
      <motion.button
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        onClick={() => onAskQuestion(explanation.nudge.question)}
        className="flex items-center gap-2 rounded-2xl bg-brand-purple/5 border border-brand-purple/20 px-3 py-2 text-left cursor-pointer transition-colors hover:bg-brand-purple/15 hover:border-brand-purple/40"
      >
        <Sparkles className="w-3 h-3 text-brand-purple shrink-0" />
        <span className="text-[11px] font-medium text-[#c4b5fd]">{explanation.nudge.question}</span>
      </motion.button>

      {/* Other metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="flex items-center gap-2 pt-1"
      >
        <span className="text-[10px] text-text-tertiary">Or explore:</span>
        {otherMetrics.map((key) => (
          <button
            key={key}
            onClick={() => onSwitchMetric(key)}
            className="text-[10px] font-medium text-[#c4b5fd] bg-brand-purple/5 border border-brand-purple/20 rounded-full px-2.5 py-1 cursor-pointer transition-colors hover:bg-brand-purple/15 hover:border-brand-purple/40"
          >
            {metricExplanations[key].label}
          </button>
        ))}
      </motion.div>
    </motion.div>
  )
}
