import { X, Calculator, TrendingDown, Sparkles, Activity, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { skepticismData, goDeeper } from '../../data/smart-explanation'
import type { FlowState } from './SmartExplanationPage'

const iconMap: Record<string, typeof Calculator> = {
  calculator: Calculator,
  activity: Activity,
  'trending-up': TrendingUp,
}

interface Props {
  flowState: FlowState
  onGoDeeper: () => void
}

export default function SkepticismPopover({ flowState, onGoDeeper }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3 }}
      className={`rounded-[10px] bg-bg-card border border-[#8b5cf650] p-4 flex flex-col gap-2.5 transition-opacity duration-300 ${
        flowState === 'deeper' ? 'opacity-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-purple" />
          <span className="text-[13px] font-semibold text-text-primary">{skepticismData.title}</span>
        </div>
        <button className="text-text-tertiary hover:text-text-secondary transition-colors bg-transparent border-0 cursor-pointer">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Formula */}
      <div className="flex items-center gap-2 rounded-lg bg-bg-card-hover px-3 py-2">
        <Calculator className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
        <span className="text-[11px] text-text-secondary">{skepticismData.formula}</span>
      </div>

      {/* Source */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
        <span className="text-[11px] text-text-secondary">{skepticismData.source}</span>
      </div>

      {/* Comparison */}
      <div className="flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2">
        <TrendingDown className="w-3.5 h-3.5 text-brand-red shrink-0" />
        <span className="text-[11px] text-text-secondary">{skepticismData.comparison}</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-card" />

      {/* Go Deeper */}
      <div className="flex flex-col gap-2.5 pt-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
          <span className="text-[13px] font-semibold text-brand-purple">Go Deeper</span>
        </div>
        <div className="flex flex-col gap-2">
          {goDeeper.map((pill, i) => {
            const Icon = iconMap[pill.icon] || Calculator
            const isRecalculate = i === 0
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.25 }}
                onClick={isRecalculate ? onGoDeeper : undefined}
                className={`flex items-center gap-2 rounded-2xl bg-brand-purple/5 border border-brand-purple/20 px-3 py-1.5 text-left transition-colors bg-transparent ${
                  isRecalculate
                    ? 'cursor-pointer hover:bg-brand-purple/15 hover:border-brand-purple/40'
                    : 'cursor-default'
                }`}
                style={{ background: 'rgba(139, 92, 246, 0.05)' }}
              >
                <Icon className="w-3 h-3 text-brand-purple shrink-0" />
                <span className="text-[11px] font-medium text-[#c4b5fd]">{pill.text}</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
