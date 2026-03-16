import { Sparkles, Check, RefreshCw, Copy } from 'lucide-react'
import type { FlowState } from './SmartExplanationPage'

const platforms = [
  { label: 'Instagram', color: '#E1306C', active: true },
  { label: 'TikTok', color: '#25F4EE', active: false },
  { label: 'YouTube', color: '#ff0000', active: false },
  { label: 'Snap', color: '#E8E050', active: false },
]

interface Props {
  flowState: FlowState
  onAskFoam: () => void
}

export default function PlatformTabs({ flowState, onAskFoam }: Props) {
  // Green "Engagement Analysis" state only for selecting and later (not arrival)
  const isActive = flowState !== 'base' && flowState !== 'arrival'
  const isArrival = flowState === 'arrival'

  return (
    <div className="rounded-lg bg-bg-card border border-border-card h-9 flex items-center gap-2.5 px-3">
      {platforms.map((p) => (
        <div
          key={p.label}
          className={`flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs cursor-pointer ${
            p.active
              ? 'bg-bg-card-hover border-2 border-brand-blue font-medium text-white'
              : 'text-text-secondary'
          }`}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span>{p.label}</span>
        </div>
      ))}

      <div className="flex-1" />

      {/* Ask Foam CTA */}
      <button
        onClick={!isActive ? onAskFoam : undefined}
        className={`flex items-center gap-1.5 h-7 px-3 rounded-full text-[11px] font-medium border-0 transition-all ${
          isActive
            ? 'bg-brand-green/10 border border-brand-green/30 text-brand-green cursor-default'
            : `bg-brand-purple/10 border border-brand-purple/30 text-[#c4b5fd] hover:bg-brand-purple/20 cursor-pointer ${isArrival ? 'glow-pulse' : ''}`
        }`}
      >
        {isActive ? (
          <>
            <Check className="w-3 h-3" />
            <span>Engagement Analysis</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3 h-3 text-brand-purple" />
            <span>How are these metrics calculated?</span>
          </>
        )}
      </button>

      <span className="text-[11px] text-text-tertiary whitespace-nowrap">Updated 2 hours ago</span>
      <RefreshCw className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
      <Copy className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
    </div>
  )
}
