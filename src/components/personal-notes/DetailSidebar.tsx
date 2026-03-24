import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, Check, ChevronLeft, ExternalLink, Link2, NotebookPen, Plus, Video, X } from 'lucide-react'
import { FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineGlobeAlt } from 'react-icons/hi2'
import { IoMailSharp } from 'react-icons/io5'
import { TbMapPin } from 'react-icons/tb'
import type { BaseCreator, CriteriaStatus, CriterionDef, CreatorEvaluation, EnrichmentDef, ReferenceType, ThinkingStep } from '../../data/creators'
import { AVAILABLE_ENRICHMENTS, CRITERION_COLORS, THINKING_STEPS } from '../../data/creators'
import type { SearchPhase } from './TableHeader'
import ThinkingPanel from './ThinkingPanel'
import PlatformIcon from './PlatformIcon'
import FilterPicker from './FilterPicker'

function ReferenceIcon({ type }: { type: ReferenceType }) {
  const sz = 15
  switch (type) {
    case 'ig': return <PlatformIcon platform="ig" size={sz} />
    case 'tt': return <PlatformIcon platform="tt" size={sz} />
    case 'yt': return <PlatformIcon platform="yt" size={sz} />
    case 'web': return <HiOutlineGlobeAlt size={sz} color="#4285F4" />
    case 'note': return <NotebookPen size={sz} color="#8B5CF6" />
    case 'email': return <IoMailSharp size={sz} color="#EA4335" />
    case 'linkedin': return <FaLinkedinIn size={sz} color="#0A66C2" />
    case 'maps': return <TbMapPin size={sz} color="#34A853" />
  }
}

interface Props {
  isOpen: boolean
  creator: BaseCreator | null
  evaluation: CreatorEvaluation | null
  query: string
  activeCriteria: CriterionDef[]
  activeEnrichments: EnrichmentDef[]
  searchPhase: SearchPhase
  matchCount: number
  totalCount: number
  criterionMatchCounts: Map<string, number>
  onClose: () => void
  onDeselectCreator: () => void
  onRemoveCriterion: (key: string) => void
  onAddStructuredCriterion: (criterion: CriterionDef) => void
  onToggleEnrichment: (enrichment: EnrichmentDef) => void
  onThinkingStepComplete: (step: ThinkingStep, index: number) => void
  onThinkingComplete: () => void
}

function StatusIcon({ status }: { status: CriteriaStatus }) {
  if (status === 'match') return <Check className="w-3.5 h-3.5 text-brand-green" />
  if (status === 'partial') return <span className="text-[13px] font-medium text-brand-amber leading-none">~</span>
  return <span className="text-[13px] text-text-tertiary leading-none">&mdash;</span>
}

function SearchContextView({
  query, activeCriteria, activeEnrichments, searchPhase,
  matchCount, totalCount, criterionMatchCounts,
  onRemoveCriterion, onAddStructuredCriterion, onToggleEnrichment,
  onThinkingStepComplete, onThinkingComplete,
}: {
  query: string
  activeCriteria: CriterionDef[]
  activeEnrichments: EnrichmentDef[]
  searchPhase: SearchPhase
  matchCount: number
  totalCount: number
  criterionMatchCounts: Map<string, number>
  onRemoveCriterion: (key: string) => void
  onAddStructuredCriterion: (criterion: CriterionDef) => void
  onToggleEnrichment: (enrichment: EnrichmentDef) => void
  onThinkingStepComplete: (step: ThinkingStep, index: number) => void
  onThinkingComplete: () => void
}) {
  const isComplete = searchPhase === 'settling' || searchPhase === 'results'

  const activeEnrichmentKeys = new Set(activeEnrichments.map((e) => e.key))

  // Find the most-limiting criterion (lowest match count, only when 2+ criteria)
  const mostLimitingKey = activeCriteria.length >= 2
    ? activeCriteria.reduce<string | null>((limitingKey, c) => {
        const count = criterionMatchCounts.get(c.key) ?? totalCount
        const limitingCount = limitingKey ? (criterionMatchCounts.get(limitingKey) ?? totalCount) : totalCount
        return count < limitingCount ? c.key : limitingKey
      }, null)
    : null

  return (
    <motion.div
      key="search-context"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-5 p-5"
    >
      {/* Criteria Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-[#54657d] tracking-[1px] uppercase">Criteria</div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-bg-card-hover border border-border-card">
            <span className="text-[10px] text-text-secondary font-medium">Creators</span>
            <svg className="w-2.5 h-2.5 text-text-tertiary" fill="none" viewBox="0 0 10 10"><path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Query text box — only when there's an NL search */}
        {query && (
          <div className="rounded-lg border border-border-card bg-bg-card-hover/30 px-3 py-2.5">
            <p className="text-[12px] text-text-primary leading-relaxed m-0">{query}</p>
          </div>
        )}

        {/* Thinking panel during decomposing */}
        <AnimatePresence>
          {searchPhase === 'decomposing' && (
            <ThinkingPanel
              steps={THINKING_STEPS}
              onStepComplete={onThinkingStepComplete}
              onAllComplete={onThinkingComplete}
            />
          )}
        </AnimatePresence>

        {/* Extracted criteria with colored left borders + match counts */}
        <div className="flex flex-col gap-1.5">
          {activeCriteria.map((c, i) => {
            const color = CRITERION_COLORS[i % CRITERION_COLORS.length]
            const isStructured = !!c.filterType
            const count = criterionMatchCounts.get(c.key)
            const isMostLimiting = c.key === mostLimitingKey
            return (
              <motion.div
                key={c.key}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-md bg-bg-card-hover/40 border-l-[3px]"
                style={{ borderLeftColor: color }}
              >
                {isStructured && c.platform && (
                  <PlatformIcon platform={c.platform} size={12} />
                )}
                {isStructured && !c.platform && (
                  <svg className="w-3 h-3 text-text-tertiary shrink-0" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
                  </svg>
                )}
                <span className="text-[12px] text-text-primary flex-1 min-w-0">{c.label}</span>
                {count !== undefined && isComplete && (
                  <span className={`flex items-center gap-1 text-[10px] font-medium shrink-0 ${isMostLimiting ? 'text-brand-amber' : 'text-text-tertiary'}`}>
                    {isMostLimiting && <AlertTriangle className="w-3 h-3" />}
                    {count} match
                  </span>
                )}
                {(activeCriteria.length > 1 || isStructured) && (
                  <button
                    onClick={() => onRemoveCriterion(c.key)}
                    className="w-5 h-5 flex items-center justify-center rounded hover:bg-bg-card-hover text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Structured filter picker */}
        <FilterPicker
          onAddStructuredCriterion={onAddStructuredCriterion}
          onRemoveCriterion={onRemoveCriterion}
          activeCriteria={activeCriteria}
        />

        {/* Exclude creators action */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-[11px] text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6.5"/><path d="M6 6L10 10M10 6L6 10" strokeLinecap="round"/></svg>
            Exclude Creators
          </button>
        </div>
      </div>

      {/* Summary stats — shown after investigation */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-bg-card-hover/30 border border-border-card"
        >
          <div className="flex items-center gap-3 text-[11px] text-text-secondary">
            <span>{matchCount} of {totalCount} match all criteria</span>
          </div>
          <span className="text-[10px] text-text-tertiary">
            Data from 4 web and social media intelligence sources
          </span>
        </motion.div>
      )}

      {/* Enrichments */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold text-[#54657d] tracking-[1px] uppercase">Enrichments</div>
          {activeEnrichments.length > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-text-tertiary">
              <Link2 className="w-3 h-3" />
              {activeEnrichments.length} / row
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_ENRICHMENTS.map((e) => {
            const isActive = activeEnrichmentKeys.has(e.key)
            return (
              <button
                key={e.key}
                onClick={() => onToggleEnrichment(e)}
                className={`
                  flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[11px] font-medium transition-colors cursor-pointer border
                  ${isActive
                    ? 'bg-brand-blue/15 border-brand-blue/30 text-brand-blue'
                    : 'bg-bg-card-hover/50 border-border-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
                  }
                `}
              >
                {e.platform && <PlatformIcon platform={e.platform} size={13} />}
                {e.label}
                {isActive && <X className="w-3 h-3" />}
              </button>
            )
          })}
          <button className="flex items-center gap-1 h-7 px-2.5 rounded-md border border-dashed border-border-card text-[11px] text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer">
            <Plus className="w-3 h-3" />
            Custom
          </button>
        </div>
      </div>

      {/* Data Sources */}
      <div className="flex flex-col gap-3">
        <div className="text-[10px] font-bold text-[#54657d] tracking-[1px] uppercase">Data Sources</div>
        <div className="flex flex-col gap-1.5">
          {['Personal notes', 'Instagram profiles', 'Content analysis', 'Location data'].map((source) => (
            <div key={source} className="flex items-center gap-2 text-[11px] text-text-tertiary">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-green/60" />
              {source}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CreatorDetailView({ creator, evaluation, activeCriteria, onBack }: {
  creator: BaseCreator
  evaluation: CreatorEvaluation | null
  activeCriteria: CriterionDef[]
  onBack: () => void
}) {
  const thumbs: string[] = []
  for (let i = 0; i < 9; i++) {
    thumbs.push(creator.thumbnails[i % creator.thumbnails.length])
  }

  return (
    <motion.div
      key={creator.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col"
    >
      {/* Back + profile header */}
      <div className="flex flex-col gap-4 p-5 pb-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[11px] text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer self-start -mt-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to search
        </button>

        <div className="flex items-center gap-3">
          <img src={creator.avatar} alt={creator.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-semibold text-text-primary">{creator.name}</div>
            <div className="text-[11px] text-text-tertiary">{creator.handle}</div>
          </div>
          <a href="#" className="flex items-center gap-1 text-[11px] text-link-blue hover:underline shrink-0">
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-center gap-2">
          {creator.ig && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-card-hover border border-border-card">
              <PlatformIcon platform="ig" size={13} />
              <span className="text-[10px] text-text-secondary font-medium">{creator.ig}</span>
            </div>
          )}
          {creator.tt && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-card-hover border border-border-card">
              <PlatformIcon platform="tt" size={13} />
              <span className="text-[10px] text-text-secondary font-medium">{creator.tt}</span>
            </div>
          )}
          {creator.yt && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bg-card-hover border border-border-card">
              <PlatformIcon platform="yt" size={13} />
              <span className="text-[10px] text-text-secondary font-medium">{creator.yt}</span>
            </div>
          )}
          <span className="text-[10px] text-text-tertiary">{creator.location}</span>
        </div>
      </div>

      {/* Relevance Summary */}
      <div className="flex flex-col gap-2 px-5 py-4 border-b border-border-card">
        <div className="text-[11px] font-semibold text-text-primary">Relevance Summary</div>
        <p className="text-[12px] text-[#8b94a2] leading-relaxed m-0">
          {evaluation?.analysis.description ?? 'No evaluation data available yet.'}
        </p>
        {creator.note && (
          <div className="rounded-md bg-brand-purple/5 border-l-[3px] border-brand-purple/15 p-2.5 flex items-start gap-2 mt-1">
            <NotebookPen className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
            <span className="text-[11px] italic text-[#c4b5fd] leading-relaxed">{creator.note.quote}</span>
          </div>
        )}
        {creator.contentCitation && (
          <div
            className="rounded-md p-2.5 flex items-start gap-2 border-l-[3px] mt-1"
            style={{ backgroundColor: `${creator.contentCitation.color}08`, borderLeftColor: `${creator.contentCitation.color}26` }}
          >
            <Video className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: creator.contentCitation.color }} />
            <span className="text-[11px] italic leading-relaxed" style={{ color: `${creator.contentCitation.color}cc` }}>{creator.contentCitation.text}</span>
          </div>
        )}
      </div>

      {/* Criteria Evaluations */}
      {evaluation && activeCriteria.length > 0 && (
        <div className="flex flex-col border-b border-border-card">
          <div className="px-5 pt-4 pb-2">
            <div className="text-[11px] font-semibold text-text-primary">Criteria Evaluations</div>
          </div>

          {activeCriteria.map((c, i) => {
            const result = evaluation.criteria[c.key]
            if (!result) return null
            const criterionColor = CRITERION_COLORS[i % CRITERION_COLORS.length]

            return (
              <div key={c.key} className="px-5 py-3 border-t border-border-card/50">
                {/* Status + criterion label */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: criterionColor }} />
                  <StatusIcon status={result.status} />
                  <span className="text-[12px] font-medium text-text-primary">{c.label}</span>
                </div>

                {/* Reasoning paragraph */}
                <p className="text-[11px] text-[#8b94a2] leading-relaxed m-0 mb-2.5">
                  {result.reasoning}
                </p>

                {/* References row */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-tertiary font-medium">References</span>
                  <div className="flex items-center gap-1.5">
                    {result.references.map((ref, j) => (
                      <div key={j} className="w-5 h-5 rounded flex items-center justify-center">
                        <ReferenceIcon type={ref} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        <div className="text-[11px] font-semibold text-text-primary">Content ({creator.contentCount})</div>
        <div className="grid grid-cols-3 gap-1.5">
          {thumbs.map((src, i) => (
            <img key={i} src={src} alt="" className="w-full aspect-[3/4] rounded-md object-cover" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function DetailSidebar({
  isOpen, creator, evaluation, query, activeCriteria, activeEnrichments, searchPhase,
  matchCount, totalCount, criterionMatchCounts,
  onClose, onDeselectCreator, onRemoveCriterion, onAddStructuredCriterion, onToggleEnrichment,
  onThinkingStepComplete, onThinkingComplete,
}: Props) {
  return (
    <motion.div
      animate={{ width: isOpen ? 420 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="shrink-0 overflow-hidden border-l border-border-card bg-bg-card"
    >
      <div className="w-[420px] h-full flex flex-col">
        <div className="flex items-center justify-between h-11 px-4 border-b border-border-card shrink-0">
          <span className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
            {creator ? 'Creator Details' : query ? 'Search Context' : 'Filters'}
          </span>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-bg-card-hover text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {creator ? (
              <CreatorDetailView
                creator={creator}
                evaluation={evaluation}
                activeCriteria={activeCriteria}
                onBack={onDeselectCreator}
              />
            ) : (
              <SearchContextView
                query={query}
                activeCriteria={activeCriteria}
                activeEnrichments={activeEnrichments}
                searchPhase={searchPhase}
                matchCount={matchCount}
                totalCount={totalCount}
                criterionMatchCounts={criterionMatchCounts}
                onRemoveCriterion={onRemoveCriterion}
                onAddStructuredCriterion={onAddStructuredCriterion}
                onToggleEnrichment={onToggleEnrichment}
                onThinkingStepComplete={onThinkingStepComplete}
                onThinkingComplete={onThinkingComplete}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
