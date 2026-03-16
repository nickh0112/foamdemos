import { healthScoreData } from '../../data/smart-explanation'

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 36
  const filled = (score / 100) * circumference
  const color = score >= 70 ? '#34c0a2' : score >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="#2a3140" strokeWidth="5" />
        <circle
          cx="40" cy="40" r="36" fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${filled} ${circumference}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[20px] font-bold text-text-primary">{score}</span>
      </div>
    </div>
  )
}

export default function HealthScoreCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-card p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <ScoreRing score={healthScoreData.score} />
        <div className="flex flex-col gap-1 pt-1">
          <span className="text-[14px] font-semibold text-text-primary">Content Health Score</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[11px] text-text-tertiary">/100</span>
          </div>
          <span className="text-[11px] text-text-secondary leading-relaxed">{healthScoreData.subtitle}</span>
        </div>
      </div>

      {/* Data coverage */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Data coverage</span>
        <div className="flex gap-2 mt-2">
          {healthScoreData.coverage.map((c) => (
            <div key={c.label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-bg-card-hover border border-border-card">
              <span className="text-[11px] font-medium text-text-primary">{c.label}</span>
              <span className="text-[11px] text-text-secondary">{c.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile completion */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Profile completion</span>
        <div className="flex flex-col gap-2.5 mt-2">
          {healthScoreData.completion.map((item) => {
            const color = item.pct >= 80 ? '#34c0a2' : item.pct >= 60 ? '#3b82f6' : '#f59e0b'
            return (
              <div key={item.label} className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="text-[11px] text-text-secondary">{item.label}</span>
                  <span className="text-[11px] text-text-secondary">{item.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-bg-card-hover overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.pct}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border-card" />

      {/* Additional profiles */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Additional profiles</span>
        <div className="flex flex-col gap-2 mt-2">
          {['Facebook', 'LinkedIn'].map((name) => (
            <div key={name} className="flex items-center justify-between py-1.5">
              <span className="text-[12px] text-text-secondary">{name}</span>
              <span className="text-[11px] text-text-tertiary">Not connected</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
