import { LayoutGroup } from 'framer-motion'
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
  dimmedCreatorIds: Set<string>
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
  dimmedCreatorIds,
}: Props) {
  const evaluationMap = new Map(evaluations.map((e) => [e.creatorId, e]))

  return (
    <div className="flex flex-col min-w-0 w-full">
      <LayoutGroup>
        {creators.map((creator) => {
          const evaluation = evaluationMap.get(creator.id) ?? null
          const isDimmed = dimmedCreatorIds.has(creator.id)
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
              isDimmed={isDimmed}
              isSelected={selectedCreatorId === creator.id}
              onSelect={() => onSelect(creator.id)}
              searchPhase={searchPhase}
            />
          )
        })}
      </LayoutGroup>
    </div>
  )
}
