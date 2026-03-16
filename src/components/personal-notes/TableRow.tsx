import type { Creator } from '../../data/creators'
import CriteriaCell from './CriteriaCell'
import ContentThumbnails from './ContentThumbnails'

interface Props {
  creator: Creator
  isSelected: boolean
  onSelect: () => void
}

export default function TableRow({ creator, isSelected, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className={`
        grid items-center h-[52px] px-5 cursor-pointer transition-colors duration-150
        ${isSelected ? 'bg-brand-blue/5 border-l-2 border-brand-blue' : 'border-l-2 border-transparent hover:bg-bg-card-hover/30'}
      `}
      style={{
        gridTemplateColumns:
          '32px minmax(160px,1.5fr) minmax(120px,1fr) minmax(100px,1fr) 56px 56px 56px minmax(110px,1fr) 1px minmax(80px,0.8fr) minmax(80px,0.8fr) minmax(80px,0.8fr)',
      }}
    >
      {/* Checkbox */}
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 rounded border border-border-card" />
      </div>

      {/* Talent name + handle */}
      <div className="flex items-center gap-2.5 min-w-0">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-text-primary truncate">{creator.name}</div>
          <div className="text-[11px] text-text-tertiary truncate">{creator.handle}</div>
        </div>
      </div>

      {/* Verticals */}
      <div className="flex items-center gap-1 min-w-0">
        {creator.verticals.slice(0, 2).map((v) => (
          <span
            key={v}
            className="text-[11px] text-text-secondary bg-bg-card-hover px-2 py-0.5 rounded-full truncate"
          >
            {v}
          </span>
        ))}
      </div>

      {/* Location */}
      <div className="text-[12px] text-text-secondary truncate">{creator.location}</div>

      {/* IG */}
      <div className="text-[12px] text-text-secondary text-center">{creator.ig}</div>

      {/* TT */}
      <div className="text-[12px] text-text-secondary text-center">{creator.tt}</div>

      {/* YT */}
      <div className="text-[12px] text-text-secondary text-center">{creator.yt}</div>

      {/* Content */}
      <div className="flex items-center">
        <ContentThumbnails thumbnails={creator.thumbnails} count={creator.contentCount} />
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-border-card mx-auto" />

      {/* Lifestyle Fit */}
      <CriteriaCell status={creator.lifestyleFit} />

      {/* Has Children */}
      <CriteriaCell status={creator.hasChildren} />

      {/* Based in Austin */}
      <CriteriaCell status={creator.basedInAustin} />
    </div>
  )
}
