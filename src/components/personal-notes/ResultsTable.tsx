import { useState, useMemo, useEffect } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { BaseCreator, CriterionDef, CreatorEvaluation, EnrichmentDef } from '../../data/creators'
import { ENRICHMENT_DATA } from '../../data/creators'
import type { CellRevealState } from '../../hooks/useInvestigation'
import type { SearchPhase } from './TableHeader'
import TableRow from './TableRow'

interface Props {
  creators: BaseCreator[]
  evaluations: CreatorEvaluation[]
  activeCriteria: CriterionDef[]
  activeEnrichments: EnrichmentDef[]
  cellStates: Map<string, CellRevealState>
  selectedCreatorId: string | null
  onSelect: (id: string) => void
  searchPhase: SearchPhase
  excludedCreatorIds: Set<string>
}

export default function ResultsTable({
  creators,
  evaluations,
  activeCriteria,
  activeEnrichments,
  cellStates,
  selectedCreatorId,
  onSelect,
  searchPhase,
  excludedCreatorIds,
}: Props) {
  const evaluationMap = new Map(evaluations.map((e) => [e.creatorId, e]))
  const [excludedExpanded, setExcludedExpanded] = useState(false)

  const { matchedCreators, excludedCreators } = useMemo(() => {
    const matched: BaseCreator[] = []
    const excluded: BaseCreator[] = []
    for (const creator of creators) {
      if (excludedCreatorIds.has(creator.id)) {
        excluded.push(creator)
      } else {
        matched.push(creator)
      }
    }
    return { matchedCreators: matched, excludedCreators: excluded }
  }, [creators, excludedCreatorIds])

  // Auto-expand when all creators are excluded (don't show empty table)
  useEffect(() => {
    if (matchedCreators.length === 0 && excludedCreators.length > 0) {
      setExcludedExpanded(true)
    }
  }, [matchedCreators.length, excludedCreators.length])

  // Collapse when excluded set clears
  useEffect(() => {
    if (excludedCreators.length === 0) setExcludedExpanded(false)
  }, [excludedCreators.length])

  return (
    <div className="flex flex-col min-w-0 w-full">
      <LayoutGroup>
        {matchedCreators.map((creator) => {
          const evaluation = evaluationMap.get(creator.id) ?? null
          const enrichmentValues = ENRICHMENT_DATA[creator.id] ?? {}

          return (
            <TableRow
              key={creator.id}
              creator={creator}
              evaluation={evaluation}
              activeCriteria={activeCriteria}
              activeEnrichments={activeEnrichments}
              enrichmentValues={enrichmentValues}
              cellStates={cellStates}
              isExcluded={false}
              isSelected={selectedCreatorId === creator.id}
              onSelect={() => onSelect(creator.id)}
              searchPhase={searchPhase}
            />
          )
        })}
      </LayoutGroup>

      {/* Excluded section divider */}
      {excludedCreators.length > 0 && (
        <motion.button
          layout
          onClick={() => setExcludedExpanded((p) => !p)}
          className="flex items-center gap-2 w-full h-9 px-5 bg-bg-card-hover/40 border-y border-border-card/50 cursor-pointer hover:bg-bg-card-hover/60 transition-colors"
        >
          <motion.div
            animate={{ rotate: excludedExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-text-tertiary" />
          </motion.div>
          <span className="text-[11px] text-text-tertiary font-medium">
            {excludedCreators.length} creator{excludedCreators.length !== 1 ? 's' : ''} don&apos;t match all criteria
          </span>
        </motion.button>
      )}

      {/* Excluded creators */}
      <AnimatePresence>
        {excludedExpanded && excludedCreators.map((creator) => {
          const evaluation = evaluationMap.get(creator.id) ?? null
          const enrichmentValues = ENRICHMENT_DATA[creator.id] ?? {}

          return (
            <TableRow
              key={creator.id}
              creator={creator}
              evaluation={evaluation}
              activeCriteria={activeCriteria}
              activeEnrichments={activeEnrichments}
              enrichmentValues={enrichmentValues}
              cellStates={cellStates}
              isExcluded={true}
              isSelected={selectedCreatorId === creator.id}
              onSelect={() => onSelect(creator.id)}
              searchPhase={searchPhase}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
