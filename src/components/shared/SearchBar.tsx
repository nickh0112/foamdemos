import { Search, Sparkles } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 h-12 px-4 bg-bg-card border-b border-border-card">
      <Search className="w-[18px] h-[18px] text-text-tertiary shrink-0" />
      <span className="text-[13px] text-text-tertiary flex-1">
        e.g. fashion talent in LA or IG ENG rate over 5%
      </span>
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
  )
}
