import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, X } from 'lucide-react'
import type { SearchPhase } from './TableHeader'

interface Props {
  query: string
  onReset: () => void
  searchPhase: SearchPhase
  totalCount: number
  evaluatedCount: number
  recognizedTerms: string[]
}

// Split query into segments, highlighting recognized terms
function highlightQuery(query: string, terms: string[]): { text: string; highlight: boolean }[] {
  const segments: { text: string; highlight: boolean }[] = []
  let remaining = query

  while (remaining.length > 0) {
    let earliestMatch: { term: string; index: number } | null = null

    for (const term of terms) {
      const idx = remaining.toLowerCase().indexOf(term.toLowerCase())
      if (idx !== -1 && (earliestMatch === null || idx < earliestMatch.index)) {
        earliestMatch = { term: remaining.slice(idx, idx + term.length), index: idx }
      }
    }

    if (!earliestMatch) {
      segments.push({ text: remaining, highlight: false })
      break
    }

    if (earliestMatch.index > 0) {
      segments.push({ text: remaining.slice(0, earliestMatch.index), highlight: false })
    }
    segments.push({ text: earliestMatch.term, highlight: true })
    remaining = remaining.slice(earliestMatch.index + earliestMatch.term.length)
  }

  return segments
}

export default function SearchHeader({ query, onReset, searchPhase, totalCount, evaluatedCount, recognizedTerms }: Props) {
  const isDecomposing = searchPhase === 'decomposing'
  const isIdle = searchPhase === 'idle'
  const isInvestigating = searchPhase === 'investigating'
  const segments = useMemo(() => highlightQuery(query, recognizedTerms), [query, recognizedTerms])

  const statusText = isInvestigating
    ? `Evaluating... ${evaluatedCount} of ${totalCount}`
    : undefined

  return (
    <div className="shrink-0">
      {/* Tab Bar */}
      <div className="flex items-center h-10 bg-bg-card border-b border-border-card px-4">
        <div className="flex items-center gap-1 flex-1">
          <button
            className="flex items-center gap-1.5 h-10 px-3 text-[12px] font-medium relative text-text-primary"
          >
            <Users className="w-3.5 h-3.5" />
            Talent
            <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-blue rounded-t" />
          </button>
        </div>
      </div>

      {/* Search Label Row — hidden in idle */}
      {!isIdle && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 44 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 px-5 overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/20 text-brand-green text-[11px] font-medium">
            <span>
              {isDecomposing
                ? segments.map((seg, i) =>
                    seg.highlight ? (
                      <motion.span
                        key={i}
                        initial={{ backgroundColor: 'rgba(139, 92, 246, 0)' }}
                        animate={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
                        transition={{ delay: i * 0.15, duration: 0.3 }}
                        className="rounded px-0.5"
                      >
                        {seg.text}
                      </motion.span>
                    ) : (
                      <span key={i}>{seg.text}</span>
                    )
                  )
                : query}
            </span>
            <X className="w-3 h-3 cursor-pointer opacity-70 hover:opacity-100" onClick={onReset} />
          </div>
          <span
            className="text-[11px] text-text-tertiary cursor-pointer hover:text-text-secondary"
            onClick={onReset}
          >
            Reset search
          </span>
          <div className="flex-1" />
          {statusText && (
            <span className="text-[11px] text-text-secondary font-medium">
              {statusText}
            </span>
          )}
        </motion.div>
      )}
    </div>
  )
}
