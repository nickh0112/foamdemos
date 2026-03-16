import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { CriteriaStatus } from '../../data/creators'
import type { CellRevealState } from '../../hooks/useInvestigation'

interface Props {
  revealState: CellRevealState
  status: CriteriaStatus
}

export default function CriteriaCell({ revealState, status }: Props) {
  if (revealState === 'empty') {
    return <div className="flex items-center justify-center w-full h-6" />
  }

  if (revealState === 'scanning') {
    return (
      <div className="flex items-center justify-center w-full">
        <div className="cell-scanning w-10 h-5" />
      </div>
    )
  }

  // revealed
  return (
    <div className="flex items-center justify-center w-full">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      >
        {status === 'match' && <Check className="w-4 h-4 text-brand-green" />}
        {status === 'partial' && <span className="text-sm font-medium text-brand-amber">~</span>}
        {status === 'no-match' && <span className="text-sm text-text-tertiary">&mdash;</span>}
      </motion.div>
    </div>
  )
}
