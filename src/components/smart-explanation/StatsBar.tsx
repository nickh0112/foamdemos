import { Calendar, Sparkles, Plus } from 'lucide-react'
import { statsBarData } from '../../data/smart-explanation'

const sparklinePaths = [
  'M0,20 Q5,18 10,15 T20,12 T30,16 T40,8 T50,14 T60,6',
  'M0,10 Q5,12 10,8 T20,6 T30,10 T40,4 T50,8 T60,3',
  'M0,18 Q5,14 10,16 T20,10 T30,8 T40,12 T50,6 T60,2',
]

export default function StatsBar() {
  return (
    <div className="h-[72px] bg-bg-app flex items-center gap-3 px-5 py-3 shrink-0">
      {/* Calendar chip */}
      <div className="flex items-center gap-2 h-10 px-3 rounded-lg bg-bg-card border border-border-card">
        <Calendar className="w-3.5 h-3.5 text-text-tertiary" />
        <span className="text-xs text-text-secondary whitespace-nowrap">Last 30 days</span>
        <Sparkles className="w-3 h-3 text-brand-purple" />
      </div>

      {/* Stat cards */}
      {statsBarData.map((stat, i) => (
        <div key={i} className="flex items-center gap-3 h-10 px-3 rounded-lg bg-bg-card border border-border-card">
          <div className="flex flex-col">
            <span className="text-[11px] text-text-tertiary leading-tight">{stat.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-bold text-text-primary leading-tight">{stat.value}</span>
              <span className="text-[11px] leading-tight" style={{ color: stat.trendColor }}>{stat.trend}</span>
            </div>
          </div>
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
            <path d={sparklinePaths[i]} stroke={stat.trendColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {/* Gender donut mini */}
      <div className="flex items-center gap-2 h-10 px-3 rounded-lg bg-bg-card border border-border-card">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" fill="none" stroke="#2a3140" strokeWidth="4" />
          <circle
            cx="16" cy="16" r="12" fill="none"
            stroke="#3b82f6" strokeWidth="4"
            strokeDasharray={`${0.63 * 75.4} ${0.37 * 75.4}`}
            strokeDashoffset="18.85"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[11px] text-text-tertiary">Gender</span>
      </div>

      {/* Add button */}
      <button className="w-10 h-10 rounded-lg border border-border-card flex items-center justify-center text-text-tertiary hover:text-text-secondary hover:border-text-tertiary transition-colors">
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}
