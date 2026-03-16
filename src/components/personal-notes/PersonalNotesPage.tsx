import { useState, useEffect, useCallback, useMemo } from 'react'
import { allCreators, QUERY_CRITERIA, EVALUATIONS } from '../../data/creators'
import type { CriterionDef, EnrichmentDef } from '../../data/creators'
import { useInvestigation } from '../../hooks/useInvestigation'
import Sidebar from '../shared/Sidebar'
import SearchHeader from './SearchHeader'
import TableHeader from './TableHeader'
import type { SearchPhase } from './TableHeader'
import ResultsTable from './ResultsTable'
import DetailSidebar from './DetailSidebar'
import { Search, Sparkles } from 'lucide-react'

export default function PersonalNotesPage() {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [searchPhase, setSearchPhase] = useState<SearchPhase>('idle')
  const [activeCriteria, setActiveCriteria] = useState<CriterionDef[]>([])
  const [activeEnrichments, setActiveEnrichments] = useState<EnrichmentDef[]>([])
  const [dimmedCreatorIds, setDimmedCreatorIds] = useState<Set<string>>(new Set())

  const investigation = useInvestigation(allCreators, activeCriteria, EVALUATIONS)

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

  // Phase: decomposing → investigating
  useEffect(() => {
    if (searchPhase !== 'decomposing') return
    const timer = setTimeout(() => {
      setSearchPhase('investigating')
      investigation.start()
    }, 1500)
    return () => clearTimeout(timer)
  }, [searchPhase, investigation.start])

  // Phase: investigating → settling (when investigation completes)
  useEffect(() => {
    if (searchPhase !== 'investigating') return
    if (!investigation.isComplete) return
    setSearchPhase('settling')
    recomputeDimmed(activeCriteria)
  }, [searchPhase, investigation.isComplete])

  // Phase: settling → results
  useEffect(() => {
    if (searchPhase !== 'settling') return
    const timer = setTimeout(() => {
      setSearchPhase('results')
    }, 800)
    return () => clearTimeout(timer)
  }, [searchPhase])

  // Recompute which creators are dimmed based on current criteria
  function recomputeDimmed(criteria: CriterionDef[]) {
    const dimmed = new Set<string>()
    const evaluationMap = new Map(EVALUATIONS.map((e) => [e.creatorId, e]))
    for (const creator of allCreators) {
      const evaluation = evaluationMap.get(creator.id)
      if (!evaluation) continue
      // Count how many criteria this creator fails on
      let noMatchCount = 0
      let knownCriteria = 0
      for (const c of criteria) {
        const result = evaluation.criteria[c.key]
        if (result) {
          knownCriteria++
          if (result.status === 'no-match') noMatchCount++
        }
      }
      // Dimmed if majority of known criteria are no-match
      if (knownCriteria > 0 && noMatchCount > knownCriteria / 2) {
        dimmed.add(creator.id)
      }
    }
    setDimmedCreatorIds(dimmed)
  }

  const handleSelect = useCallback((id: string) => {
    setSelectedCreatorId((prev) => (prev === id ? null : id))
  }, [])

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setSelectedCreatorId(null)
      setDimmedCreatorIds(new Set())
      setActiveCriteria(QUERY_CRITERIA)
      setActiveEnrichments([])
      setSearchPhase('decomposing')
    }
  }, [query])

  const handleReset = useCallback(() => {
    setQuery('')
    setSelectedCreatorId(null)
    setDimmedCreatorIds(new Set())
    setActiveCriteria([])
    setActiveEnrichments([])
    setSearchPhase('idle')
  }, [])

  const handleRemoveCriterion = useCallback((key: string) => {
    setActiveCriteria((prev) => {
      const next = prev.filter((c) => c.key !== key)
      // Recompute dimming with remaining criteria
      setTimeout(() => recomputeDimmed(next), 0)
      return next
    })
  }, [])

  const handleAddCriterion = useCallback((label: string) => {
    const key = `custom_${Date.now()}`
    const newCriterion: CriterionDef = { key, label }
    setActiveCriteria((prev) => [...prev, newCriterion])
  }, [])

  // Compute limiting criterion dynamically
  const limitingCriterion = useMemo(() => {
    if (activeCriteria.length === 0) return ''
    const evaluationMap = new Map(EVALUATIONS.map((e) => [e.creatorId, e]))
    let maxNoMatch = 0
    let limitingLabel = activeCriteria[0].label

    for (const c of activeCriteria) {
      let noMatchCount = 0
      for (const creator of allCreators) {
        const evaluation = evaluationMap.get(creator.id)
        const result = evaluation?.criteria[c.key]
        if (result && result.status === 'no-match') noMatchCount++
      }
      if (noMatchCount > maxNoMatch) {
        maxNoMatch = noMatchCount
        limitingLabel = c.label
      }
    }
    return limitingLabel
  }, [activeCriteria])

  // Compute limiting criterion key for broaden
  const limitingCriterionKey = useMemo(() => {
    if (activeCriteria.length === 0) return ''
    const evaluationMap = new Map(EVALUATIONS.map((e) => [e.creatorId, e]))
    let maxNoMatch = 0
    let limitingKey = activeCriteria[0].key

    for (const c of activeCriteria) {
      let noMatchCount = 0
      for (const creator of allCreators) {
        const evaluation = evaluationMap.get(creator.id)
        const result = evaluation?.criteria[c.key]
        if (result && result.status === 'no-match') noMatchCount++
      }
      if (noMatchCount > maxNoMatch) {
        maxNoMatch = noMatchCount
        limitingKey = c.key
      }
    }
    return limitingKey
  }, [activeCriteria])

  const handleBroadenSearch = useCallback(() => {
    if (limitingCriterionKey && activeCriteria.length > 1) {
      handleRemoveCriterion(limitingCriterionKey)
    }
  }, [limitingCriterionKey, activeCriteria.length, handleRemoveCriterion])

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
    ? EVALUATIONS.find((e) => e.creatorId === selectedCreatorId) ?? null
    : null

  const matchCount = useMemo(() => {
    const evaluationMap = new Map(EVALUATIONS.map((e) => [e.creatorId, e]))
    let count = 0
    for (const creator of allCreators) {
      const evaluation = evaluationMap.get(creator.id)
      if (!evaluation) continue
      const allMatch = activeCriteria.every((c) => {
        const result = evaluation.criteria[c.key]
        return result && result.status !== 'no-match'
      })
      if (allMatch) count++
    }
    return count
  }, [activeCriteria])

  const evaluatedCount = investigation.revealedScores.size

  // Broadened count: how many more would match if we removed the limiting criterion
  const broadenedCount = useMemo(() => {
    if (activeCriteria.length <= 1) return 0
    const remainingCriteria = activeCriteria.filter((c) => c.key !== limitingCriterionKey)
    const evaluationMap = new Map(EVALUATIONS.map((e) => [e.creatorId, e]))
    let countWithout = 0
    for (const creator of allCreators) {
      const evaluation = evaluationMap.get(creator.id)
      if (!evaluation) continue
      const allMatch = remainingCriteria.every((c) => {
        const result = evaluation.criteria[c.key]
        return result && result.status !== 'no-match'
      })
      if (allMatch) countWithout++
    }
    return countWithout - matchCount
  }, [activeCriteria, limitingCriterionKey, matchCount])

  // Sort creators: original order during idle/decomposing/investigating, descending score during settling/results
  const sortedCreators = useMemo(() => {
    if (searchPhase === 'settling' || searchPhase === 'results') {
      const evaluationMap = new Map(EVALUATIONS.map((e) => [e.creatorId, e]))
      return [...allCreators].sort((a, b) => {
        const scoreA = evaluationMap.get(a.id)?.score ?? 0
        const scoreB = evaluationMap.get(b.id)?.score ?? 0
        return scoreB - scoreA
      })
    }
    return allCreators
  }, [searchPhase])

  const hasActiveSearch = searchPhase !== 'idle'

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
                placeholder="Try: Austin creators who have kids and do lifestyle content"
                className="flex-1 bg-transparent text-[13px] text-text-primary placeholder:text-text-tertiary outline-none"
              />
              {query.trim() && (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-brand-purple/15 border border-brand-purple/30 text-[11px] font-medium text-brand-purple hover:bg-brand-purple/25 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  Search with AI
                </button>
              )}
            </form>
            <div className="flex items-center gap-2">
              <div className="h-6 px-2 rounded bg-bg-card-hover border border-[#3a4250] flex items-center">
                <span className="text-[11px] text-text-secondary">&#8984;K</span>
              </div>
              <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-brand-purple/10">
                <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                <span className="text-xs font-medium text-brand-purple">Ask Assist</span>
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
            matchCount={matchCount}
            totalCount={allCreators.length}
            evaluatedCount={evaluatedCount}
          />

          {/* Scrollable table area — both axes */}
          <div className="flex-1 overflow-auto">
            <TableHeader
              activeCriteria={activeCriteria}
              activeEnrichments={activeEnrichments}
              searchPhase={searchPhase}
            />

            <ResultsTable
              creators={sortedCreators}
              evaluations={EVALUATIONS}
              activeCriteria={activeCriteria}
              activeEnrichments={activeEnrichments}
              cellStates={investigation.cellStates}
              selectedCreatorId={selectedCreatorId}
              onSelect={handleSelect}
              searchPhase={searchPhase}
              dimmedCreatorIds={dimmedCreatorIds}
            />
          </div>
        </div>

        {/* Right detail sidebar */}
        <DetailSidebar
          isOpen={hasActiveSearch}
          creator={selectedCreator}
          evaluation={selectedEvaluation}
          query={query}
          activeCriteria={activeCriteria}
          activeEnrichments={activeEnrichments}
          searchPhase={searchPhase}
          matchCount={matchCount}
          totalCount={allCreators.length}
          limitingCriterion={limitingCriterion}
          broadenedCount={broadenedCount}
          onClose={handleReset}
          onDeselectCreator={() => setSelectedCreatorId(null)}
          onRemoveCriterion={handleRemoveCriterion}
          onAddCriterion={handleAddCriterion}
          onBroadenSearch={handleBroadenSearch}
          onToggleEnrichment={handleToggleEnrichment}
        />
      </div>
    </div>
  )
}
