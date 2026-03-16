import { creators } from '../../data/creators'

export default function SummaryBar() {
  const allMatch = creators.filter(
    (c) => c.lifestyleFit === 'match' && c.hasChildren === 'match' && c.basedInAustin === 'match'
  )

  return (
    <div className="flex flex-col gap-1 px-5 py-2.5 border-t border-border-card">
      <div className="flex items-center gap-4 text-[11px] text-text-secondary">
        <span>
          {allMatch.length} of {creators.length} match all criteria
        </span>
        <span className="text-border-card">|</span>
        <span>
          {creators.length} creators evaluated
        </span>
      </div>
      <span className="text-[10px] text-text-tertiary">
        Data collected from 4 web and social media intelligence sources
      </span>
    </div>
  )
}
