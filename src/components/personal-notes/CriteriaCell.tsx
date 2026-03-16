import { Check } from 'lucide-react'
import type { CriteriaStatus } from '../../data/creators'

interface Props {
  status: CriteriaStatus
}

export default function CriteriaCell({ status }: Props) {
  if (status === 'match') {
    return (
      <div className="flex items-center justify-center w-full">
        <Check className="w-4 h-4 text-brand-green" />
      </div>
    )
  }

  if (status === 'partial') {
    return (
      <div className="flex items-center justify-center w-full">
        <span className="text-sm font-medium text-brand-amber">~</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full">
      <span className="text-sm text-text-tertiary">&mdash;</span>
    </div>
  )
}
