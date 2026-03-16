import { useState, useEffect, useCallback } from 'react'
import { creators } from '../../data/creators'
import Sidebar from '../shared/Sidebar'
import SearchHeader from './SearchHeader'
import ResultsTable from './ResultsTable'
import ExpandedShelf from './ExpandedShelf'
import { Search, Sparkles } from 'lucide-react'

export default function PersonalNotesPage() {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | null>(null)
  const [query, setQuery] = useState('Austin creators who have kids and do lifestyle content')
  const [searchKey, setSearchKey] = useState(0)

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

  const handleSelect = useCallback((id: string) => {
    setSelectedCreatorId((prev) => (prev === id ? null : id))
  }, [])

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setSelectedCreatorId(null)
      setSearchKey((k) => k + 1)
    }
  }, [query])

  const handleReset = useCallback(() => {
    setQuery('')
    setSelectedCreatorId(null)
    setSearchKey((k) => k + 1)
  }, [])

  const selectedCreator = selectedCreatorId
    ? creators.find((c) => c.id === selectedCreatorId) ?? null
    : null

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-bg-app">
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

        <SearchHeader query={query} onReset={handleReset} />
        <div className="flex-1 overflow-y-auto">
          <ResultsTable
            key={searchKey}
            selectedCreatorId={selectedCreatorId}
            onSelect={handleSelect}
          />
        </div>
        <ExpandedShelf creator={selectedCreator} />
      </div>
    </div>
  )
}
