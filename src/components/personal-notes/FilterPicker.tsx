import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, User, X } from 'lucide-react'
import type { CriterionDef, StructuredFilterDef } from '../../data/creators'
import { STRUCTURED_FILTERS, formatEnrichmentValue } from '../../data/creators'
import PlatformIcon from './PlatformIcon'

interface Props {
  activeCriteria: CriterionDef[]
  onAddStructuredCriterion: (criterion: CriterionDef) => void
  onRemoveCriterion: (key: string) => void
}

type PlatformTab = 'ig' | 'tt' | 'yt' | 'profile'

const TABS: { id: PlatformTab; label: string }[] = [
  { id: 'ig', label: 'IG' },
  { id: 'tt', label: 'TT' },
  { id: 'yt', label: 'YT' },
  { id: 'profile', label: 'Profile' },
]

const TAB_PLATFORM_MAP: Record<PlatformTab, string> = {
  ig: 'Instagram',
  tt: 'TikTok',
  yt: 'YouTube',
  profile: 'Profile',
}

function getFiltersForTab(tab: PlatformTab): StructuredFilterDef[] {
  return STRUCTURED_FILTERS.filter((f) => f.category === TAB_PLATFORM_MAP[tab])
}

function getActiveCriterionForFilter(filter: StructuredFilterDef, activeCriteria: CriterionDef[]): CriterionDef | undefined {
  return activeCriteria.find((c) => c.filterType && c.key.startsWith(filter.key))
}

const INPUT_BASE = 'h-7 w-[60px] px-2 rounded text-[12px] text-text-primary placeholder:text-text-tertiary/40 outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
const INPUT_DEFAULT = `${INPUT_BASE} bg-bg-card-hover border border-border-card focus:border-brand-purple/40`
const INPUT_ACTIVE = `${INPUT_BASE} bg-brand-purple/[0.06] border border-brand-purple/25 focus:border-brand-purple/40`

// ─── Compact single-line range filter ───

function RangeFilterRow({
  filter,
  activeCriterion,
  onApply,
  onRemove,
}: {
  filter: StructuredFilterDef
  activeCriterion: CriterionDef | undefined
  onApply: (criterion: CriterionDef) => void
  onRemove: (key: string) => void
}) {
  const [minVal, setMinVal] = useState('')
  const [maxVal, setMaxVal] = useState('')

  useEffect(() => {
    if (!activeCriterion) {
      setMinVal('')
      setMaxVal('')
    } else {
      const op = activeCriterion.operator
      if (op === 'gte') { setMinVal(String(activeCriterion.value)); setMaxVal('') }
      else if (op === 'lte') { setMinVal(''); setMaxVal(String(activeCriterion.value)) }
      else if (op === 'between') { setMinVal(String(activeCriterion.value)); setMaxVal(String(activeCriterion.valueTo ?? '')) }
    }
  }, [activeCriterion?.key])

  function applyFilter() {
    const min = minVal ? parseFloat(minVal) : null
    const max = maxVal ? parseFloat(maxVal) : null

    if (min == null && max == null) {
      if (activeCriterion) onRemove(activeCriterion.key)
      return
    }

    let operator: 'gte' | 'lte' | 'between'
    let displayVal: string
    const platformLabel = filter.platform ? { ig: 'IG', tt: 'TT', yt: 'YT' }[filter.platform] + ' ' : ''

    if (min != null && max != null) {
      operator = 'between'
      const minDisp = filter.isPercent ? `${min}%` : formatEnrichmentValue(min, false)
      const maxDisp = filter.isPercent ? `${max}%` : formatEnrichmentValue(max, false)
      displayVal = `${minDisp} – ${maxDisp}`
    } else if (min != null) {
      operator = 'gte'
      displayVal = `≥ ${filter.isPercent ? `${min}%` : formatEnrichmentValue(min, false)}`
    } else {
      operator = 'lte'
      displayVal = `≤ ${filter.isPercent ? `${max}%` : formatEnrichmentValue(max!, false)}`
    }

    onApply({
      key: filter.key,
      label: `${platformLabel}${filter.label} ${displayVal}`,
      filterType: 'range',
      enrichmentKey: filter.enrichmentKey,
      operator,
      value: min ?? max!,
      valueTo: operator === 'between' ? max! : undefined,
      platform: filter.platform,
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') applyFilter()
  }

  const hasActive = !!activeCriterion
  const minPh = filter.isPercent ? `${filter.min ?? 0}%` : String(filter.min ?? 0)
  const maxPh = filter.isPercent ? `${filter.max ?? 100}%` : formatEnrichmentValue(filter.max ?? 0, false)

  return (
    <div className={`flex items-center gap-2 h-9 rounded-md px-2 -mx-2 transition-colors ${hasActive ? 'bg-brand-purple/[0.04]' : ''}`}>
      <span className={`text-[12px] flex-1 min-w-0 truncate ${hasActive ? 'text-brand-purple font-medium' : 'text-text-secondary'}`}>
        {filter.label}
      </span>
      <input
        type="number"
        value={minVal}
        onChange={(e) => setMinVal(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={minPh}
        step={filter.step}
        className={hasActive ? INPUT_ACTIVE : INPUT_DEFAULT}
      />
      <span className="text-[10px] text-text-tertiary">–</span>
      <input
        type="number"
        value={maxVal}
        onChange={(e) => setMaxVal(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={maxPh}
        step={filter.step}
        className={hasActive ? INPUT_ACTIVE : INPUT_DEFAULT}
      />
      {hasActive ? (
        <button
          onClick={() => onRemove(activeCriterion!.key)}
          className="w-5 h-5 flex items-center justify-center rounded text-brand-purple/40 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors cursor-pointer shrink-0"
        >
          <X className="w-3 h-3" />
        </button>
      ) : (
        <div className="w-5 shrink-0" />
      )}
    </div>
  )
}

// ─── Multi-select pills ───

function MultiSelectFilterField({
  filter,
  activeCriterion,
  onApply,
  onRemove,
}: {
  filter: StructuredFilterDef
  activeCriterion: CriterionDef | undefined
  onApply: (criterion: CriterionDef) => void
  onRemove: (key: string) => void
}) {
  const [searchText, setSearchText] = useState('')
  const options = filter.options ?? []
  const activeValues = new Set(activeCriterion?.selectValues ?? [])

  function toggleOption(opt: string) {
    const next = new Set(activeValues)
    if (next.has(opt)) next.delete(opt)
    else next.add(opt)

    if (next.size === 0) {
      if (activeCriterion) onRemove(activeCriterion.key)
      return
    }

    const values = [...next]
    const label = filter.label + ': ' + (values.length <= 2 ? values.join(', ') : `${values[0]} +${values.length - 1}`)

    onApply({ key: filter.key, label, filterType: 'multi-select', selectValues: values })
  }

  const hasActive = activeValues.size > 0
  const showSearch = options.length > 6
  const filtered = searchText
    ? options.filter((o) => o.toLowerCase().includes(searchText.toLowerCase()))
    : options

  return (
    <div className={`flex flex-col gap-1.5 rounded-lg px-2.5 py-2 -mx-2.5 transition-colors ${hasActive ? 'bg-brand-purple/[0.04]' : ''}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[12px] font-medium ${hasActive ? 'text-brand-purple' : 'text-text-secondary'}`}>{filter.label}</span>
        {hasActive && (
          <button
            onClick={() => activeCriterion && onRemove(activeCriterion.key)}
            className="w-4 h-4 flex items-center justify-center rounded text-brand-purple/40 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      {showSearch && (
        <div className="relative">
          <Search className="w-3 h-3 text-text-tertiary absolute left-2 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="w-full h-6 pl-6 pr-2 rounded-md bg-bg-card-hover border border-border-card text-[10px] text-text-primary placeholder:text-text-tertiary outline-none focus:border-brand-purple/40 transition-colors"
          />
        </div>
      )}
      <div className="flex flex-wrap gap-1">
        {filtered.map((opt) => (
          <button
            key={opt}
            onClick={() => toggleOption(opt)}
            className={`h-6 px-2.5 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
              activeValues.has(opt)
                ? 'bg-brand-purple/15 border-brand-purple/40 text-brand-purple'
                : 'bg-bg-card-hover/50 border-border-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Audience threshold: inline pill-to-input ───

function AudienceThresholdField({
  filter,
  activeCriteria,
  onApply,
  onRemove,
}: {
  filter: StructuredFilterDef
  activeCriteria: CriterionDef[]
  onApply: (criterion: CriterionDef) => void
  onRemove: (key: string) => void
}) {
  const [editingSegment, setEditingSegment] = useState<string | null>(null)
  const [thresholdVal, setThresholdVal] = useState('')
  const options = filter.options ?? []

  const activeBySegment = new Map<string, CriterionDef>()
  for (const c of activeCriteria) {
    if (c.filterType === 'audience-threshold' && c.audienceField === filter.audienceField && c.platform === filter.platform && c.audienceSegment) {
      activeBySegment.set(c.audienceSegment, c)
    }
  }

  const hasAny = activeBySegment.size > 0

  function handlePillClick(opt: string) {
    const existing = activeBySegment.get(opt)
    if (existing) { onRemove(existing.key); return }
    setEditingSegment(opt)
    setThresholdVal('')
  }

  function handleApply() {
    const val = parseFloat(thresholdVal)
    if (isNaN(val) || !editingSegment) return

    const platformLabel = filter.platform ? { ig: 'IG', tt: 'TT', yt: 'YT' }[filter.platform] + ' ' : ''

    onApply({
      key: `${filter.key}_${editingSegment}`,
      label: `${platformLabel}${editingSegment} ≥ ${val}%`,
      filterType: 'audience-threshold',
      platform: filter.platform,
      audienceField: filter.audienceField,
      audienceSegment: editingSegment,
      operator: 'gte',
      value: val,
    })
    setEditingSegment(null)
    setThresholdVal('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleApply()
    if (e.key === 'Escape') { setEditingSegment(null); setThresholdVal('') }
  }

  return (
    <div className={`flex flex-col gap-1.5 rounded-lg px-2.5 py-2 -mx-2.5 transition-colors ${hasAny ? 'bg-brand-purple/[0.04]' : ''}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[12px] font-medium ${hasAny ? 'text-brand-purple' : 'text-text-secondary'}`}>{filter.label}</span>
        {hasAny && (
          <button
            onClick={() => activeBySegment.forEach((c) => onRemove(c.key))}
            className="w-4 h-4 flex items-center justify-center rounded text-brand-purple/40 hover:text-brand-purple hover:bg-brand-purple/10 transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => {
          const active = activeBySegment.get(opt)
          const isEditing = editingSegment === opt

          if (isEditing) {
            return (
              <div
                key={opt}
                className="flex items-center gap-0.5 h-6 pl-2 pr-1 rounded-full bg-brand-blue/10 border border-brand-blue/30"
              >
                <span className="text-[11px] text-brand-blue font-medium whitespace-nowrap">{opt} ≥</span>
                <input
                  autoFocus
                  type="number"
                  value={thresholdVal}
                  onChange={(e) => setThresholdVal(e.target.value)}
                  onBlur={() => { if (thresholdVal) handleApply(); else setEditingSegment(null) }}
                  onKeyDown={handleKeyDown}
                  placeholder="30"
                  min={0}
                  max={100}
                  className="w-8 h-5 bg-transparent text-[11px] text-brand-blue font-medium outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[10px] text-brand-blue">%</span>
              </div>
            )
          }

          return (
            <button
              key={opt}
              onClick={() => handlePillClick(opt)}
              className={`h-6 px-2.5 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                active
                  ? 'bg-brand-purple/15 border-brand-purple/40 text-brand-purple'
                  : 'bg-bg-card-hover/50 border-border-card text-text-secondary hover:text-text-primary hover:bg-bg-card-hover'
              }`}
            >
              {opt}{active ? ` ≥${active.value}%` : ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Section label ───

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-0.5 pb-0.5">
      <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">{children}</span>
      <div className="flex-1 h-px bg-border-card/50" />
    </div>
  )
}

// ─── Main component ───

export default function FilterPicker({ activeCriteria, onAddStructuredCriterion, onRemoveCriterion }: Props) {
  const [activeTab, setActiveTab] = useState<PlatformTab>('ig')
  const filters = getFiltersForTab(activeTab)

  const performanceFilters = filters.filter((f) => f.filterType === 'range')
  const audienceFilters = filters.filter((f) => f.filterType === 'audience-threshold')
  const selectFilters = filters.filter((f) => f.filterType === 'multi-select')

  return (
    <div className="flex flex-col gap-2.5">
      {/* Platform tab strip */}
      <div className="flex items-center gap-1 p-0.5 rounded-lg bg-bg-card-hover/30">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const activeCount = activeCriteria.filter(
            (c) => c.filterType && (
              tab.id === 'profile' ? !c.platform : c.platform === tab.id
            )
          ).length
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 flex-1 justify-center h-7 rounded-md text-[12px] font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-bg-card text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tab.id !== 'profile' ? (
                <PlatformIcon platform={tab.id} size={12} />
              ) : (
                <User className="w-3 h-3" />
              )}
              {tab.label}
              {activeCount > 0 && (
                <span className="flex items-center justify-center min-w-[14px] h-3.5 px-1 rounded-full bg-brand-purple/20 text-[8px] font-bold text-brand-purple">
                  {activeCount}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Filter fields for active tab */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="flex flex-col gap-1"
      >
        {/* Performance range fields — compact rows */}
        {performanceFilters.length > 0 && (audienceFilters.length > 0 || selectFilters.length > 0) && (
          <SectionLabel>Performance</SectionLabel>
        )}
        {performanceFilters.map((f) => {
          const activeCriterion = getActiveCriterionForFilter(f, activeCriteria)
          return (
            <RangeFilterRow
              key={f.key}
              filter={f}
              activeCriterion={activeCriterion}
              onApply={onAddStructuredCriterion}
              onRemove={onRemoveCriterion}
            />
          )
        })}

        {/* Multi-select fields (Profile tab) */}
        {selectFilters.map((f) => {
          const activeCriterion = getActiveCriterionForFilter(f, activeCriteria)
          return (
            <MultiSelectFilterField
              key={f.key}
              filter={f}
              activeCriterion={activeCriterion}
              onApply={onAddStructuredCriterion}
              onRemove={onRemoveCriterion}
            />
          )
        })}

        {/* Audience section */}
        {audienceFilters.length > 0 && (
          <>
            <SectionLabel>Audience</SectionLabel>
            {audienceFilters.map((f) => (
              <AudienceThresholdField
                key={f.key}
                filter={f}
                activeCriteria={activeCriteria}
                onApply={onAddStructuredCriterion}
                onRemove={onRemoveCriterion}
              />
            ))}
          </>
        )}
      </motion.div>

      {/* NL link */}
      <div className="flex items-center gap-2 pt-0.5">
        <div className="flex-1 h-px bg-border-card" />
        <span className="text-[9px] text-text-tertiary">or describe in natural language</span>
        <div className="flex-1 h-px bg-border-card" />
      </div>
    </div>
  )
}
