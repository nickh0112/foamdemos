import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Users, CalendarDays, HeartHandshake, MessageSquare, X, Sparkles } from 'lucide-react'
import { RECOGNIZED_TERMS } from '../../data/creators'
import type { SearchPhase } from './TableHeader'

interface Props {
  query: string
  onReset: () => void
  searchPhase: SearchPhase
  matchCount: number
  totalCount: number
  evaluatedCount: number
}

const tabs = [
  { label: 'Talent', icon: Users, active: true },
  { label: 'Event', icon: CalendarDays, active: false },
  { label: 'Matchmaking', icon: HeartHandshake, active: false },
  { label: 'Chat', icon: MessageSquare, active: false },
]

// Split query into segments, highlighting recognized terms
function highlightQuery(query: string): { text: string; highlight: boolean }[] {
  const segments: { text: string; highlight: boolean }[] = []
  let remaining = query

  while (remaining.length > 0) {
    let earliestMatch: { term: string; index: number } | null = null

    for (const term of RECOGNIZED_TERMS) {
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

export default function SearchHeader({ query, onReset, searchPhase, matchCount, totalCount, evaluatedCount }: Props) {
  const isDecomposing = searchPhase === 'decomposing'
  const isIdle = searchPhase === 'idle'
  const isInvestigating = searchPhase === 'investigating'
  const segments = useMemo(() => highlightQuery(query), [query])

  const statusText = isInvestigating
    ? `Evaluating... ${evaluatedCount} of ${totalCount}`
    : `${matchCount} of ${totalCount} creators match`

  return (
    <div className="shrink-0">
      {/* Tab Bar */}
      <div className="flex items-center h-10 bg-bg-card border-b border-border-card px-4">
        <div className="flex items-center gap-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`
                flex items-center gap-1.5 h-10 px-3 text-[12px] font-medium relative
                transition-colors duration-150
                ${tab.active
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
                }
              `}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.active && !isIdle && matchCount > 0 && (
                <span className="ml-1 px-1.5 py-px rounded-full bg-brand-green/20 text-brand-green text-[10px] font-semibold">
                  {matchCount}
                </span>
              )}
              {tab.active && (
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-blue rounded-t" />
              )}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-brand-blue text-white text-[12px] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Generate
        </button>
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
          <span className="text-[11px] text-text-tertiary">Built by AI based on</span>
          <span className="px-1.5 py-0.5 rounded bg-link-blue/15 text-link-blue text-[10px] font-medium">
            profile and notes
          </span>
          <span className="text-[11px] text-text-secondary font-medium">
            {statusText}
          </span>
        </motion.div>
      )}
    </div>
  )
}
