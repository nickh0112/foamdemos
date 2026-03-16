import { AnimatePresence, motion } from 'framer-motion'
import { Instagram, NotebookPen, Video, Check, ExternalLink } from 'lucide-react'
import type { Creator, CriteriaStatus } from '../../data/creators'

interface Props {
  creator: Creator | null
}

function StatusIcon({ status }: { status: CriteriaStatus }) {
  if (status === 'match') return <Check className="w-3.5 h-3.5 text-brand-green" />
  if (status === 'partial') return <span className="text-[13px] font-medium text-brand-amber leading-none">~</span>
  return <span className="text-[13px] text-text-tertiary leading-none">&mdash;</span>
}

function MatchingRow({ label, status, value, sourceColor }: {
  label: string; status: CriteriaStatus; value: string; sourceColor: string
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 shrink-0"><StatusIcon status={status} /></div>
      <div className="min-w-0">
        <div className="text-[11px] text-[#8b94a2]">{label}</div>
        <div className="text-[12px] font-semibold" style={{ color: sourceColor }}>{value}</div>
      </div>
    </div>
  )
}

function ShelfContent({ creator }: { creator: Creator }) {
  const thumbs: string[] = []
  for (let i = 0; i < 10; i++) {
    thumbs.push(creator.thumbnails[i % creator.thumbnails.length])
  }

  return (
    <div className="flex gap-6">
      {/* Avatar Column */}
      <div className="flex flex-col items-center gap-2 w-[120px] shrink-0">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <span className="text-[12px] font-semibold text-text-primary">{creator.handle}</span>
        <a href="#" className="flex items-center gap-1 text-[11px] text-link-blue hover:underline">
          View profile <ExternalLink className="w-3 h-3" />
        </a>
        <div className="flex items-center gap-1.5 mt-1">
          <Instagram className="w-3.5 h-3.5 text-text-secondary" />
          <span className="text-[11px] text-text-secondary font-medium">{creator.ig}</span>
        </div>
      </div>

      {/* Analysis Column */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="text-[10px] font-bold text-[#54657d] tracking-[1px] uppercase">Analysis</div>
        <p className="text-[12px] text-[#8b94a2] leading-relaxed m-0">
          {creator.analysis.description}
        </p>

        {creator.note && (
          <div className="rounded-md bg-brand-purple/5 border-l-[3px] border-brand-purple/15 p-3 flex items-start gap-2">
            <NotebookPen className="w-3.5 h-3.5 text-brand-purple shrink-0 mt-0.5" />
            <span className="text-[11px] italic text-[#c4b5fd] leading-relaxed">{creator.note.quote}</span>
          </div>
        )}

        {creator.contentCitation && (
          <div
            className="rounded-md p-3 flex items-start gap-2 border-l-[3px]"
            style={{
              backgroundColor: `${creator.contentCitation.color}08`,
              borderLeftColor: `${creator.contentCitation.color}26`,
            }}
          >
            <Video className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: creator.contentCitation.color }} />
            <span className="text-[11px] italic leading-relaxed" style={{ color: `${creator.contentCitation.color}cc` }}>
              {creator.contentCitation.text}
            </span>
          </div>
        )}
      </div>

      {/* Matching Column */}
      <div className="flex flex-col gap-3 w-[200px] shrink-0">
        <div className="text-[10px] font-bold text-[#54657d] tracking-[1px] uppercase">Matching</div>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Lifestyle Fit', status: creator.lifestyleFit, ...creator.matching.lifestyleFit },
            { label: 'Has Children', status: creator.hasChildren, ...creator.matching.hasChildren },
            { label: 'Based in Austin', status: creator.basedInAustin, ...creator.matching.basedInAustin },
          ].map((entry, i) => (
            <MatchingRow key={i} label={entry.label} status={entry.status} value={entry.value} sourceColor={entry.sourceColor} />
          ))}
        </div>
      </div>

      {/* Content Column */}
      <div className="flex flex-col gap-3 w-[360px] shrink-0">
        <div className="text-[10px] font-bold text-[#54657d] tracking-[1px] uppercase">
          Content ({creator.contentCount})
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {thumbs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-[68px] h-[90px] rounded-md object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ExpandedShelf({ creator }: Props) {
  return (
    <AnimatePresence>
      {creator && (
        <motion.div
          key={creator.id}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-bg-card border-t border-border-card p-6 shrink-0"
        >
          <ShelfContent creator={creator} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
