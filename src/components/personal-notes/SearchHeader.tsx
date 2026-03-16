import { Users, CalendarDays, HeartHandshake, MessageSquare, X, Sparkles } from 'lucide-react'

interface Props {
  query: string
  onReset: () => void
}

const tabs = [
  { label: 'Talent', icon: Users, active: true, badge: '4' },
  { label: 'Event', icon: CalendarDays, active: false },
  { label: 'Matchmaking', icon: HeartHandshake, active: false },
  { label: 'Chat', icon: MessageSquare, active: false },
]

export default function SearchHeader({ query, onReset }: Props) {
  return (
    <div className="shrink-0">
      {/* Tab Bar */}
      <div className="flex items-center h-10 bg-bg-card border-b border-border-card px-4">
        <div className="flex items-center gap-1 flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`
                flex items-center gap-1.5 h-10 px-3 text-[12px] font-medium relative
                transition-colors duration-150
                ${tab.active
                  ? 'text-text-primary'
                  : 'text-text-tertiary hover:text-text-secondary'
                }
              `}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.badge && (
                <span className="ml-1 px-1.5 py-px rounded-full bg-brand-green/20 text-brand-green text-[10px] font-semibold">
                  {tab.badge}
                </span>
              )}
              {tab.active && (
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-blue rounded-t" />
              )}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-brand-blue text-white text-[12px] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          Generate
        </button>
      </div>

      {/* Search Label Row */}
      <div className="flex items-center gap-2 h-11 px-5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-green/20 text-brand-green text-[11px] font-medium">
          <span>{query}</span>
          <X className="w-3 h-3 cursor-pointer opacity-70 hover:opacity-100" onClick={onReset} />
        </div>
        <span
          className="text-[11px] text-text-tertiary cursor-pointer hover:text-text-secondary"
          onClick={onReset}
        >
          Reset search
        </span>
        <div className="flex-1" />
        <span className="text-[11px] text-text-tertiary">Built by AI based on</span>
        <span className="px-1.5 py-0.5 rounded bg-link-blue/15 text-link-blue text-[10px] font-medium">
          profile and notes
        </span>
        <span className="text-[11px] text-text-secondary font-medium">
          4 of 62 creators match
        </span>
      </div>
    </div>
  )
}
