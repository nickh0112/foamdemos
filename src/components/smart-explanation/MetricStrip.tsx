import { metricsData } from '../../data/smart-explanation'
import type { FlowState } from './SmartExplanationPage'

interface MetricStripProps {
  flowState: FlowState
}

const metrics = [
  metricsData.engagement,
  metricsData.reach,
  metricsData.views,
]

export default function MetricStrip({ flowState }: MetricStripProps) {
  const isHighlighted = flowState !== 'base'

  return (
    <div className="rounded-[10px] bg-bg-card border border-border-card flex items-center shrink-0">
      {metrics.map((metric, i) => (
        <div key={metric.label} className="flex-1 flex items-center">
          {i > 0 && <div className="w-px h-10 bg-border-card shrink-0" />}
          <div
            className={`flex-1 flex flex-col items-center justify-center py-3.5 px-5 transition-all duration-300 ${
              i === 0 && isHighlighted
                ? 'border-2 border-brand-purple/50 bg-brand-purple/5 rounded-lg m-0.5'
                : ''
            }`}
          >
            <span className="text-[10px] text-text-tertiary">{metric.sublabel}</span>
            <span className="text-[20px] font-bold text-text-primary leading-tight">{metric.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
