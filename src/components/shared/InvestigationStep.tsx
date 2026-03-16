import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Props {
  text: string
  result: string
  status: 'pending' | 'active' | 'complete'
}

export default function InvestigationStep({ text, result, status }: Props) {
  if (status === 'pending') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-2.5 py-1"
    >
      {/* Status indicator */}
      <div className="mt-1 shrink-0">
        {status === 'active' ? (
          <div
            className="w-2 h-2 rounded-full bg-brand-purple"
            style={{ animation: 'pulse-dot 1.2s ease-in-out infinite' }}
          />
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Check className="w-3 h-3 text-brand-green" />
          </motion.div>
        )}
      </div>

      {/* Text + result */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[11px] text-text-secondary leading-snug">{text}</span>
        {status === 'complete' && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-[11px] font-medium text-brand-purple"
          >
            {result}
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}
