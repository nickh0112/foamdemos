import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { creators } from '../../data/creators'
import TableRow from './TableRow'
import SummaryBar from './SummaryBar'

interface Props {
  selectedCreatorId: string | null
  onSelect: (id: string) => void
}

export default function ResultsTable({ selectedCreatorId, onSelect }: Props) {
  const [revealedRows, setRevealedRows] = useState<number>(0)
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    // Progressive row reveal with staggered timing
    const timers: ReturnType<typeof setTimeout>[] = []
    creators.forEach((_, i) => {
      timers.push(
        setTimeout(() => setRevealedRows(i + 1), 300 + i * 400)
      )
    })
    // Show summary bar after all rows
    timers.push(
      setTimeout(() => setShowSummary(true), 300 + creators.length * 400 + 200)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="flex flex-col min-w-0 w-full">
      {/* Header Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid items-center h-9 px-5 border-b border-border-card shrink-0"
        style={{
          gridTemplateColumns:
            '32px minmax(160px,1.5fr) minmax(120px,1fr) minmax(100px,1fr) 56px 56px 56px minmax(110px,1fr) 1px minmax(80px,0.8fr) minmax(80px,0.8fr) minmax(80px,0.8fr)',
        }}
      >
        <span />
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Talent name</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Verticals</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Location</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">IG</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">TT</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">YT</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Content</span>
        <span />
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">Lifestyle Fit</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">Has Children</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">Based in Austin</span>
      </motion.div>

      {/* Data Rows — progressive reveal */}
      {creators.map((creator, i) => {
        const isRevealed = i < revealedRows

        if (!isRevealed) {
          // Shimmer placeholder row
          return (
            <div
              key={creator.id}
              className="flex items-center h-[52px] px-5 gap-4"
            >
              <div className="w-4 h-4 rounded shimmer" />
              <div className="w-8 h-8 rounded-full shimmer" />
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="h-3 w-28 rounded shimmer" />
                <div className="h-2.5 w-20 rounded shimmer" />
              </div>
              <div className="flex-1 flex gap-1.5">
                <div className="h-5 w-16 rounded-full shimmer" />
                <div className="h-5 w-14 rounded-full shimmer" />
              </div>
              <div className="h-3 w-16 rounded shimmer" />
              <div className="h-3 w-8 rounded shimmer" />
              <div className="h-3 w-8 rounded shimmer" />
              <div className="h-3 w-8 rounded shimmer" />
              <div className="flex gap-1">
                <div className="w-8 h-8 rounded shimmer" />
                <div className="w-8 h-8 rounded shimmer" />
                <div className="w-8 h-8 rounded shimmer" />
              </div>
            </div>
          )
        }

        return (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <TableRow
              creator={creator}
              isSelected={selectedCreatorId === creator.id}
              onSelect={() => onSelect(creator.id)}
            />
          </motion.div>
        )
      })}

      {/* Summary Bar */}
      {showSummary ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SummaryBar />
        </motion.div>
      ) : (
        <div className="flex items-center h-10 px-5 border-t border-border-card">
          <div className="h-3 w-48 rounded shimmer" />
          <div className="flex-1" />
          <div className="h-3 w-32 rounded shimmer" />
        </div>
      )}
    </div>
  )
}
