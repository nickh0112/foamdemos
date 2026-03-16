import { profileData } from '../../data/smart-explanation'

export default function FollowersCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-card p-4">
      <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Total Followers</span>
      <div className="text-[20px] font-bold text-text-primary mt-1 mb-3">{profileData.totalFollowers}</div>

      <div className="flex flex-col gap-2.5">
        {profileData.platforms.map((p) => (
          <div key={p.name} className="flex items-center gap-2.5">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: p.color }}
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[12px] text-text-primary font-medium truncate">{p.name}</span>
              <span className="text-[11px] text-text-tertiary truncate">{p.handle}</span>
            </div>
            <span className="text-[12px] text-text-primary font-medium shrink-0">{p.followers}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                p.status === 'Active'
                  ? 'bg-brand-green/10 text-brand-green'
                  : 'bg-brand-amber/10 text-brand-amber'
              }`}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
