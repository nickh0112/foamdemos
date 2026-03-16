import { demographicsData } from '../../data/smart-explanation'

function GenderCard() {
  const { male, female } = demographicsData.gender
  const circumference = 2 * Math.PI * 40
  const maleArc = (male / 100) * circumference
  const femaleArc = (female / 100) * circumference

  return (
    <div className="flex-1 rounded-xl bg-bg-card border border-border-card p-4 flex flex-col" style={{ minHeight: 190 }}>
      <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase mb-3">Gender</span>
      <div className="flex items-center gap-4 flex-1">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#2a3140" strokeWidth="10" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="#3b82f6" strokeWidth="10"
            strokeDasharray={`${maleArc} ${circumference}`}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke="#34c0a2" strokeWidth="10"
            strokeDasharray={`${femaleArc} ${circumference}`}
            strokeDashoffset={circumference * 0.25 - maleArc}
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-link-blue" />
            <span className="text-[12px] text-text-secondary">Male {male}%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-green" />
            <span className="text-[12px] text-text-secondary">Female {female}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CountriesCard() {
  return (
    <div className="flex-1 rounded-xl bg-bg-card border border-border-card p-4 flex flex-col" style={{ minHeight: 190 }}>
      <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase mb-3">Countries</span>
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {demographicsData.countries.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-[11px] text-text-secondary w-20 shrink-0 truncate">{c.name}</span>
            <div className="flex-1 h-2 rounded-full bg-bg-card-hover overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-blue"
                style={{ width: `${c.pct}%` }}
              />
            </div>
            <span className="text-[11px] text-text-secondary w-8 text-right">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AgeCard() {
  return (
    <div className="flex-1 rounded-xl bg-bg-card border border-border-card p-4 flex flex-col" style={{ minHeight: 190 }}>
      <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase mb-3">Age</span>
      <div className="flex flex-col gap-2 flex-1 justify-center">
        {demographicsData.ageGroups.map((g) => (
          <div key={g.range} className="flex items-center gap-2">
            <span className="text-[11px] text-text-secondary w-10 shrink-0">{g.range}</span>
            <div className="flex-1 h-2 rounded-full bg-bg-card-hover overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-purple"
                style={{ width: `${g.pct}%` }}
              />
            </div>
            <span className="text-[11px] text-text-secondary w-8 text-right">{g.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DemographicsRow() {
  return (
    <div className="flex gap-3">
      <GenderCard />
      <CountriesCard />
      <AgeCard />
    </div>
  )
}
