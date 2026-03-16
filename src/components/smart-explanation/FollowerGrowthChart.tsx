import { useState, useEffect } from 'react'
import { followerGrowthData } from '../../data/smart-explanation'

interface Props {
  isSelectable?: boolean
  isSelected?: boolean
  isPrompting?: boolean
  glowDelay?: number
  onSelect?: () => void
}

export default function FollowerGrowthChart({ isSelectable, isSelected, isPrompting, glowDelay = 1700, onSelect }: Props) {
  const [glowActive, setGlowActive] = useState(false)

  useEffect(() => {
    if (!isPrompting) {
      setGlowActive(false)
      return
    }
    const timer = setTimeout(() => setGlowActive(true), glowDelay)
    return () => clearTimeout(timer)
  }, [isPrompting, glowDelay])

  // Simple upward trending polyline points
  const points = [
    [0, 120], [50, 115], [100, 108], [150, 112], [200, 95],
    [250, 88], [300, 78], [350, 65], [400, 55], [450, 40],
    [500, 48], [550, 30],
  ]
  const polyline = points.map(([x, y]) => `${x},${y}`).join(' ')

  // Area fill path
  const areaPath = `M${points[0][0]},${points[0][1]} ${points.map(([x, y]) => `L${x},${y}`).join(' ')} L${points[points.length - 1][0]},140 L${points[0][0]},140 Z`

  return (
    <div
      onClick={isSelectable ? onSelect : undefined}
      className={`rounded-xl bg-bg-card border p-5 transition-all ${
        isSelected
          ? 'border-[rgba(139,92,246,0.5)]'
          : glowActive
            ? 'border-[rgba(139,92,246,0.3)]'
            : 'border-border-card'
      } ${
        isSelectable
          ? 'cursor-pointer hover:border-[rgba(139,92,246,0.4)]'
          : ''
      } ${glowActive ? 'glow-pulse' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">
          {followerGrowthData.title}
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[20px] font-bold text-text-primary">{followerGrowthData.current}</span>
        <span className="text-[11px] text-brand-green">{followerGrowthData.change}</span>
      </div>

      {/* Chart */}
      <div className="rounded-lg bg-bg-card-hover p-3">
        <svg width="100%" height="140" viewBox="0 0 550 140" preserveAspectRatio="none" className="overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#155fef" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#155fef" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#chartGradient)" />
          <polyline
            points={polyline}
            fill="none"
            stroke="#155fef"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Month labels */}
      <div className="flex justify-between mt-2 px-1">
        {followerGrowthData.months.map((m) => (
          <span key={m} className="text-[10px] text-text-tertiary">{m}</span>
        ))}
      </div>
    </div>
  )
}
