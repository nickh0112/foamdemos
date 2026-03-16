import {
  House, Users, MessageCircle, ImageIcon, List,
  BarChart3, Shield, Eye, Search
} from 'lucide-react'

const topIcons = [
  { Icon: House, active: false },
  { Icon: Users, active: true },
  { Icon: MessageCircle, active: false },
  { Icon: ImageIcon, active: false },
  { Icon: List, active: false },
  { Icon: BarChart3, active: false },
  { Icon: Shield, active: false },
  { Icon: Eye, active: false },
]

export default function Sidebar() {
  return (
    <div className="w-12 shrink-0 bg-bg-sidebar flex flex-col items-center justify-between py-3 h-full">
      <div className="flex flex-col items-center gap-1.5 w-full">
        {topIcons.map(({ Icon, active }, i) => (
          <div key={i} className="flex items-center justify-center w-full">
            {active ? (
              <div className="relative w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <div className="absolute left-0 top-0 w-[3px] h-full rounded-r bg-brand-blue" />
                <Icon className="w-5 h-5 text-brand-blue" />
              </div>
            ) : (
              <Icon className="w-5 h-5 text-text-tertiary" />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1.5 w-full">
        <Search className="w-5 h-5 text-text-tertiary" />
        <div className="w-7 h-7 rounded-full bg-link-blue flex items-center justify-center">
          <span className="text-[10px] font-semibold text-white">BN</span>
        </div>
      </div>
    </div>
  )
}
