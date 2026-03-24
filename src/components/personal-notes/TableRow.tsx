import { motion } from 'framer-motion'
import type { BaseCreator, CriterionDef, CreatorEvaluation, EnrichmentDef } from '../../data/creators'
import { evaluateStructuredCriterion } from '../../data/creators'
import type { CellRevealState } from '../../hooks/useInvestigation'
import type { SearchPhase } from './TableHeader'
import CriteriaCell from './CriteriaCell'
import ContentThumbnails from './ContentThumbnails'
import PlatformIcon from './PlatformIcon'

const FLUID_COLS = '36px minmax(200px,1.8fr) minmax(160px,1.2fr) minmax(140px,1fr) 72px 72px 72px minmax(160px,1.2fr)'
const FIXED_COLS = '36px 200px 160px 140px 72px 72px 72px 160px'
const BASE_W = 912
const CRITERIA_COL_W = 85
const ENRICHMENT_COL_W = 100
const DIVIDER_W = 20

interface Props {
  creator: BaseCreator
  evaluation: CreatorEvaluation | null
  activeCriteria: CriterionDef[]
  activeEnrichments: EnrichmentDef[]
  enrichmentValues: Record<string, string>
  cellStates: Map<string, CellRevealState>
  isExcluded: boolean
  isSelected: boolean
  onSelect: () => void
  searchPhase: SearchPhase
}

export default function TableRow({
  creator,
  evaluation,
  activeCriteria,
  activeEnrichments,
  enrichmentValues,
  cellStates,
  isExcluded,
  isSelected,
  onSelect,
  searchPhase,
}: Props) {
  const hasNLCriteria = activeCriteria.some(c => !c.filterType) && searchPhase !== 'idle'
  const hasStructuredCriteria = activeCriteria.some(c => c.filterType != null)
  const hasCriteria = hasNLCriteria || hasStructuredCriteria
  const hasExtraCols = hasCriteria || activeEnrichments.length > 0
  const criteriaWidth = hasCriteria ? DIVIDER_W + activeCriteria.length * CRITERIA_COL_W : 0
  const enrichmentWidth = activeEnrichments.length > 0 ? DIVIDER_W + activeEnrichments.length * ENRICHMENT_COL_W : 0

  return (
    <motion.div
      {...(isExcluded
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
        : { layout: true, layoutId: creator.id, animate: { opacity: 1 } }
      )}
      transition={{
        opacity: { duration: 0.3 },
        layout: { type: 'spring', stiffness: 200, damping: 28 },
      }}
      onClick={onSelect}
      style={hasExtraCols ? { minWidth: BASE_W + criteriaWidth + enrichmentWidth } : undefined}
      className={`
        flex items-center h-[52px] px-5 cursor-pointer transition-colors duration-150
        ${isExcluded
          ? 'border-l-2 border-text-tertiary/20 bg-bg-card-hover/10 hover:bg-bg-card-hover/30'
          : isSelected
            ? 'bg-brand-blue/5 border-l-2 border-brand-blue'
            : 'border-l-2 border-transparent hover:bg-bg-card-hover/30'
        }
      `}
    >
      {/* Base columns */}
      <div
        className={hasExtraCols ? 'shrink-0 grid items-center h-full' : 'flex-1 grid items-center h-full min-w-0'}
        style={hasExtraCols ? { gridTemplateColumns: FIXED_COLS, width: BASE_W } : { gridTemplateColumns: FLUID_COLS }}
      >
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded border border-border-card" />
        </div>
        <div className="flex items-center gap-2.5 min-w-0">
          <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-text-primary truncate">{creator.name}</div>
            <div className="text-[11px] text-text-tertiary truncate">{creator.handle}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 min-w-0">
          {creator.verticals.slice(0, 2).map((v) => (
            <span key={v} className="text-[11px] text-text-secondary bg-bg-card-hover px-2 py-0.5 rounded-full truncate">{v}</span>
          ))}
        </div>
        <div className="text-[12px] text-text-secondary truncate">{creator.location}</div>
        <div className="text-[12px] text-text-secondary text-center">{creator.ig}</div>
        <div className="text-[12px] text-text-secondary text-center">{creator.tt}</div>
        <div className="text-[12px] text-text-secondary text-center">{creator.yt}</div>
        <div className="flex items-center">
          <ContentThumbnails thumbnails={creator.thumbnails} count={creator.contentCount} />
        </div>
      </div>

      {/* Criteria columns */}
      <motion.div
        animate={{ width: criteriaWidth }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden shrink-0"
      >
        <div className="flex items-center" style={{ width: criteriaWidth }}>
          <div className="w-px h-8 bg-border-card mx-2 shrink-0" />
          {activeCriteria.map((c) => {
            const cellKey = `${creator.id}:${c.key}`
            const revealState = c.filterType
              ? 'revealed' as const
              : (cellStates.get(cellKey) ?? (searchPhase === 'results' || searchPhase === 'settling' ? 'revealed' : 'empty'))
            const status = c.filterType
              ? (evaluateStructuredCriterion(creator.id, creator, c) ? 'match' : 'no-match')
              : (evaluation?.criteria[c.key]?.status ?? 'no-match')
            return (
              <div key={c.key} className="flex-1 flex items-center justify-center">
                <CriteriaCell revealState={revealState} status={status} />
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Enrichment columns */}
      <motion.div
        animate={{ width: enrichmentWidth }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden shrink-0"
      >
        <div className="flex items-center" style={{ width: enrichmentWidth }}>
          <div className="w-px h-8 bg-border-card mx-2 shrink-0" />
          {activeEnrichments.map((e) => (
            <motion.div
              key={e.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-1"
              style={{ width: ENRICHMENT_COL_W, flexShrink: 0 }}
            >
              {e.platform && <PlatformIcon platform={e.platform} size={13} />}
              <span className="text-[11px] text-text-secondary truncate">
                {enrichmentValues[e.key] ?? '—'}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
