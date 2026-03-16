import { profileData } from '../../data/smart-explanation'

const brandLogos = [
  { name: 'Nike', color: '#ff6b35' },
  { name: 'Adidas', color: '#3b82f6' },
  { name: 'Pepsi', color: '#ef4444' },
  { name: 'Fenty', color: '#8b5cf6' },
]

export default function BioCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-card p-5 flex flex-col gap-3 h-full">
      {/* Bio */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Bio</span>
        <p className="text-[12px] text-text-secondary leading-relaxed mt-1.5 m-0">{profileData.bio}</p>
      </div>

      <div className="h-px bg-border-card" />

      {/* Verticals */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Verticals</span>
        <div className="flex gap-1.5 mt-1.5">
          {profileData.verticals.map((v) => (
            <span
              key={v}
              className="text-[11px] px-2.5 py-1 rounded-full bg-bg-card-hover border border-border-card text-text-secondary"
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      <div className="h-px bg-border-card" />

      {/* Managed by */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Managed by</span>
        <div className="flex items-center gap-2 mt-1.5">
          <div className="w-6 h-6 rounded-full bg-link-blue flex items-center justify-center">
            <span className="text-[9px] font-semibold text-white">BN</span>
          </div>
          <span className="text-[12px] text-text-secondary">{profileData.managedBy}</span>
        </div>
      </div>

      <div className="h-px bg-border-card" />

      {/* Brand experience */}
      <div>
        <span className="text-[11px] font-semibold text-text-tertiary tracking-wider uppercase">Brand Experience</span>
        <div className="flex gap-2 mt-2">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ backgroundColor: brand.color }}
              title={brand.name}
            >
              {brand.name.charAt(0)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
