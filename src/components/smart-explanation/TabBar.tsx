import { LayoutGrid, FileText, Folder, User, Sparkles } from 'lucide-react'

const tabs = [
  { label: 'Overview', icon: LayoutGrid, active: true },
  { label: 'Content', icon: FileText, active: false },
  { label: 'Media kits and lists', icon: Folder, active: false },
  { label: 'Profile & notes', icon: User, active: false },
]

export default function TabBar() {
  return (
    <div className="h-10 bg-bg-card border-b border-border-card flex items-center px-5 shrink-0">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          className={`flex items-center gap-1.5 h-full px-3.5 text-[13px] border-0 bg-transparent cursor-pointer transition-colors ${
            tab.active
              ? 'text-text-primary bg-bg-card-hover rounded-t-md font-medium'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <tab.icon className={`w-3.5 h-3.5 ${tab.active ? 'text-white' : 'text-text-tertiary'}`} />
          {tab.label}
        </button>
      ))}

      <div className="flex-1" />

      {/* Ask Assist (different from Ask Foam — this is the top-bar version) */}
      <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-md bg-brand-purple/10 border-0 cursor-pointer">
        <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
        <span className="text-xs font-medium text-brand-purple">Ask Assist</span>
      </button>
    </div>
  )
}
