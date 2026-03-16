import { profileData } from '../../data/smart-explanation'

export default function ProfileCard() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-card p-6 flex flex-col items-center text-center">
      {/* Avatar */}
      <img
        src={profileData.avatar}
        alt={profileData.name}
        className="w-[120px] h-[120px] rounded-full object-cover border-2 border-border-card mb-3"
      />
      <h2 className="text-[16px] font-bold text-text-primary mb-1">{profileData.name}</h2>
      <span className="text-[12px] text-text-secondary mb-2">{profileData.handle}</span>
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full bg-brand-green" />
        <span className="text-[12px] text-text-secondary">{profileData.location}</span>
      </div>
      <span className="text-[11px] text-text-tertiary">{profileData.age}</span>
    </div>
  )
}
