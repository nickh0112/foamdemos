import { motion } from 'framer-motion'
import type { CriterionDef, EnrichmentDef } from '../../data/creators'
import PlatformIcon from './PlatformIcon'

export type SearchPhase = 'idle' | 'decomposing' | 'investigating' | 'settling' | 'results'

const FLUID_COLS = '36px minmax(200px,1.8fr) minmax(160px,1.2fr) minmax(140px,1fr) 72px 72px 72px minmax(160px,1.2fr)'
const FIXED_COLS = '36px 200px 160px 140px 72px 72px 72px 160px'
const BASE_W = 912
const CRITERIA_COL_W = 85
const ENRICHMENT_COL_W = 100
const DIVIDER_W = 20

interface Props {
  activeCriteria: CriterionDef[]
  activeEnrichments: EnrichmentDef[]
  searchPhase: SearchPhase
}

export default function TableHeader({ activeCriteria, activeEnrichments, searchPhase }: Props) {
  const hasNLCriteria = activeCriteria.some(c => !c.filterType) && searchPhase !== 'idle'
  const hasStructuredCriteria = activeCriteria.some(c => c.filterType != null)
  const hasCriteria = hasNLCriteria || hasStructuredCriteria
  const hasExtraCols = hasCriteria || activeEnrichments.length > 0
  const isDecomposing = searchPhase === 'decomposing'
  const staggerDelays = activeCriteria.map((_, i) => i * 0.3)

  const criteriaWidth = hasCriteria ? DIVIDER_W + activeCriteria.length * CRITERIA_COL_W : 0
  const enrichmentWidth = activeEnrichments.length > 0 ? DIVIDER_W + activeEnrichments.length * ENRICHMENT_COL_W : 0

  return (
    <div
      className="flex items-center h-9 px-5 border-b border-border-card shrink-0 sticky top-0 z-10 bg-bg-app"
      style={hasExtraCols ? { minWidth: BASE_W + criteriaWidth + enrichmentWidth } : undefined}
    >
      <div
        className={hasExtraCols ? 'shrink-0 grid items-center h-full' : 'flex-1 grid items-center h-full min-w-0'}
        style={hasExtraCols ? { gridTemplateColumns: FIXED_COLS, width: BASE_W } : { gridTemplateColumns: FLUID_COLS }}
      >
        <span />
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Talent name</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Verticals</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Location</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">IG</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">TT</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center">YT</span>
        <span className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider">Content</span>
      </div>

      {/* Criteria columns */}
      <motion.div
        animate={{ width: criteriaWidth }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden shrink-0"
      >
        <div className="flex items-center h-9" style={{ width: criteriaWidth }}>
          <div className="w-px h-5 bg-border-card mx-2 shrink-0" />
          {activeCriteria.map((c, i) => (
            <motion.span
              key={c.key}
              initial={isDecomposing ? { opacity: 0, y: -4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={isDecomposing ? { delay: staggerDelays[i], duration: 0.3 } : { duration: 0 }}
              className="flex-1 text-[10px] font-semibold text-text-tertiary uppercase tracking-wider text-center"
            >
              {c.label}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Enrichment columns */}
      <motion.div
        animate={{ width: enrichmentWidth }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden shrink-0"
      >
        <div className="flex items-center h-9" style={{ width: enrichmentWidth }}>
          <div className="w-px h-5 bg-border-card mx-2 shrink-0" />
          {activeEnrichments.map((e) => (
            <motion.div
              key={e.key}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-1"
              style={{ width: ENRICHMENT_COL_W, flexShrink: 0 }}
            >
              {e.platform && <PlatformIcon platform={e.platform} size={13} />}
              <span className="text-[10px] font-semibold text-brand-blue/80 uppercase tracking-wider">
                {e.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
