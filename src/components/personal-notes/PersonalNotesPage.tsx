import { useState, useEffect, useCallback, useMemo } from 'react'
import { allCreators, AVAILABLE_ENRICHMENTS, evaluateStructuredCriterion, resolveQueryFlow } from '../../data/creators'
import type { CriterionDef, EnrichmentDef, ThinkingStep, QueryFlow } from '../../data/creators'
import { useInvestigation } from '../../hooks/useInvestigation'
import Sidebar from '../shared/Sidebar'
import SearchHeader from './SearchHeader'
import TableHeader from './TableHeader'
import type { SearchPhase } from './TableHeader'
import ResultsTable from './ResultsTable'
import DetailSidebar from './DetailSidebar'
import { Filter, Search } from 'lucide-react'

export default function PersonalNotesPage() {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchPhase, setSearchPhase] = useState<SearchPhase>('idle')
  const [activeCriteria, setActiveCriteria] = useState<CriterionDef[]>([])
  const [activeEnrichments, setActiveEnrichments] = useState<EnrichmentDef[]>([])
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false)
  const [activeFlow, setActiveFlow] = useState<QueryFlow | null>(null)

  const evaluations = activeFlow?.evaluations ?? []

  const investigation = useInvestigation(allCreators, activeCriteria, evaluations)

  useEffect(() => {
    document.title = 'Personal Notes Search — Foam'
  }, [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedCreatorId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // ThinkingPanel step complete: add criterion if step has one
  const handleThinkingStepComplete = useCallback((step: ThinkingStep) => {
    if (step.criterionKey) {
      const criteria = activeFlow?.criteria ?? []
      const criterion = criteria.find((c) => c.key === step.criterionKey)
      if (criterion) {
        setActiveCriteria((prev) => {
          if (prev.some((c) => c.key === criterion.key)) return prev
          return [...prev, criterion]
        })
      }
    }
  }, [activeFlow])

  // ThinkingPanel all steps done: transition to investigating
  const handleThinkingComplete = useCallback(() => {
    setSearchPhase('investigating')
    investigation.start()
  }, [investigation.start])

  // Phase: investigating → settling (when investigation completes)
  useEffect(() => {
    if (searchPhase !== 'investigating') return
    if (!investigation.isComplete) return
    setSearchPhase('settling')
  }, [searchPhase, investigation.isComplete])

  // Phase: settling → results
  useEffect(() => {
    if (searchPhase !== 'settling') return
    const timer = setTimeout(() => {
      setSearchPhase('results')
    }, 800)
    return () => clearTimeout(timer)
  }, [searchPhase])

  // Reactive excluded IDs: creators that don't match ALL active criteria
  const excludedCreatorIds = useMemo(() => {
    if (activeCriteria.length === 0) return new Set<string>()
    const evaluationMap = new Map(evaluations.map((e) => [e.creatorId, e]))
    const excluded = new Set<string>()
    for (const creator of allCreators) {
      const evaluation = evaluationMap.get(creator.id)
      const allMatch = activeCriteria.every((c) => {
        if (c.filterType) return evaluateStructuredCriterion(creator.id, creator, c)
        if (!evaluation) return false
        const result = evaluation.criteria[c.key]
        return result && result.status !== 'no-match'
      })
      if (!allMatch) excluded.add(creator.id)
    }
    return excluded
  }, [activeCriteria, evaluations])

  // Per-criterion match counts for sidebar pills
  const criterionMatchCounts = useMemo(() => {
    const evaluationMap = new Map(evaluations.map((e) => [e.creatorId, e]))
    const counts = new Map<string, number>()
    for (const c of activeCriteria) {
      let count = 0
      for (const creator of allCreators) {
        if (c.filterType) {
          if (evaluateStructuredCriterion(creator.id, creator, c)) count++
        } else {
          const evaluation = evaluationMap.get(creator.id)
          const result = evaluation?.criteria[c.key]
          if (result && result.status !== 'no-match') count++
        }
      }
      counts.set(c.key, count)
    }
    return counts
  }, [activeCriteria, evaluations])

  const handleSelect = useCallback((id: string) => {
    setSelectedCreatorId((prev) => (prev === id ? null : id))
  }, [])

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      const flow = resolveQueryFlow(query)
      setActiveFlow(flow)
      setSelectedCreatorId(null)
      setActiveCriteria([])
      setActiveEnrichments([])
      setSearchPhase('decomposing')
    }
  }, [query])

  const handleReset = useCallback(() => {
    setQuery('')
    setSelectedCreatorId(null)
    setActiveCriteria([])
    setActiveEnrichments([])
    setSearchPhase('idle')
    setActiveFlow(null)
  }, [])

  const handleRemoveCriterion = useCallback((key: string) => {
    setActiveCriteria((prev) => prev.filter((c) => c.key !== key))
  }, [])

  const handleAddStructuredCriterion = useCallback((criterion: CriterionDef) => {
    setActiveCriteria((prev) => {
      const idx = prev.findIndex((c) => c.key === criterion.key)
      return idx >= 0
        ? prev.map((c, i) => i === idx ? criterion : c)
        : [...prev, criterion]
    })
    // Auto-enable matching enrichment column
    if (criterion.enrichmentKey) {
      const matchingEnrichment = AVAILABLE_ENRICHMENTS.find((e) => e.key === criterion.enrichmentKey)
      if (matchingEnrichment) {
        setActiveEnrichments((prev) => {
          if (prev.some((e) => e.key === matchingEnrichment.key)) return prev
          return [...prev, matchingEnrichment]
        })
      }
    }
  }, [])

  const handleToggleEnrichment = useCallback((enrichment: EnrichmentDef) => {
    setActiveEnrichments((prev) => {
      const exists = prev.some((e) => e.key === enrichment.key)
      return exists ? prev.filter((e) => e.key !== enrichment.key) : [...prev, enrichment]
    })
  }, [])

  const selectedCreator = selectedCreatorId
    ? allCreators.find((c) => c.id === selectedCreatorId) ?? null
    : null

  const selectedEvaluation = selectedCreatorId
    ? evaluations.find((e) => e.creatorId === selectedCreatorId) ?? null
    : null

  const evaluatedCount = investigation.revealedScores.size

  // Sort creators: original order during idle/decomposing/investigating, descending score during settling/results
  const sortedCreators = useMemo(() => {
    if (searchPhase === 'settling' || searchPhase === 'results') {
      const evaluationMap = new Map(evaluations.map((e) => [e.creatorId, e]))
      return [...allCreators].sort((a, b) => {
        const scoreA = evaluationMap.get(a.id)?.score ?? 0
        const scoreB = evaluationMap.get(b.id)?.score ?? 0
        return scoreB - scoreA
      })
    }
    return allCreators
  }, [searchPhase, evaluations])

  const sidebarVisible = searchPhase !== 'idle' || filterSidebarOpen || activeCriteria.length > 0

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex overflow-hidden bg-bg-app">
        {/* Main table column */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Top nav search bar */}
          <div className="flex items-center gap-3 h-12 px-4 bg-bg-card border-b border-border-card shrink-0">
            <Search className="w-[18px] h-[18px] text-text-tertiary shrink-0" />
            <form
              className="flex-1 flex items-center"
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch()
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: Austin lifestyle creators with kids, American dads..."
                className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-tertiary outline-none"
              />
              {query.trim() && (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-brand-blue/15 border border-brand-blue/30 text-[11px] font-medium text-brand-blue hover:bg-brand-blue/25 transition-colors cursor-pointer"
                >
                  Search
                </button>
              )}
            </form>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterSidebarOpen((p) => !p)}
                className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md border transition-colors cursor-pointer ${
                  filterSidebarOpen || activeCriteria.some((c) => c.filterType)
                    ? 'bg-brand-blue/15 border-brand-blue/30 text-brand-blue'
                    : 'bg-bg-card-hover border-[#3a4250] text-text-secondary hover:text-text-primary'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Filters</span>
                {activeCriteria.filter((c) => c.filterType).length > 0 && (
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand-blue/20 text-[9px] font-bold text-brand-blue">
                    {activeCriteria.filter((c) => c.filterType).length}
                  </span>
                )}
              </button>
              <div className="h-6 px-2 rounded bg-bg-card-hover border border-[#3a4250] flex items-center">
                <span className="text-[11px] text-text-secondary">&#8984;K</span>
              </div>
              <div className="h-7 px-3 rounded-md bg-bg-card-hover border border-[#3a4250] flex items-center">
                <span className="text-xs font-medium text-text-secondary">Shortlist</span>
              </div>
            </div>
          </div>

          <SearchHeader
            query={query}
            onReset={handleReset}
            searchPhase={searchPhase}
            totalCount={allCreators.length}
            evaluatedCount={evaluatedCount}
            recognizedTerms={activeFlow?.recognizedTerms ?? []}
          />

          {/* Scrollable table area */}
          <div className="flex-1 overflow-y-auto overflow-x-auto min-h-0">
            <TableHeader
              activeCriteria={activeCriteria}
              activeEnrichments={activeEnrichments}
              searchPhase={searchPhase}
            />

            <ResultsTable
              creators={sortedCreators}
              evaluations={evaluations}
              activeCriteria={activeCriteria}
              activeEnrichments={activeEnrichments}
              cellStates={investigation.cellStates}
              selectedCreatorId={selectedCreatorId}
              onSelect={handleSelect}
              searchPhase={searchPhase}
              excludedCreatorIds={excludedCreatorIds}
            />
          </div>
        </div>

        {/* Right detail sidebar */}
        <DetailSidebar
          isOpen={sidebarVisible}
          creator={selectedCreator}
          evaluation={selectedEvaluation}
          query={query}
          activeCriteria={activeCriteria}
          activeEnrichments={activeEnrichments}
          evaluations={evaluations}
          searchPhase={searchPhase}
          totalCount={allCreators.length}
          criterionMatchCounts={criterionMatchCounts}
          thinkingSteps={activeFlow?.thinkingSteps ?? []}
          onClose={() => { setFilterSidebarOpen(false); handleReset() }}
          onDeselectCreator={() => setSelectedCreatorId(null)}
          onRemoveCriterion={handleRemoveCriterion}
          onAddStructuredCriterion={handleAddStructuredCriterion}
          onToggleEnrichment={handleToggleEnrichment}
          onThinkingStepComplete={handleThinkingStepComplete}
          onThinkingComplete={handleThinkingComplete}
        />
      </div>
    </div>
  )
}
