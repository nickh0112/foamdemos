import { recentActivity } from '../../data/smart-explanation'

export default function RecentActivity() {
  return (
    <div className="rounded-xl bg-bg-card border border-border-card p-4">
      <h3 className="text-[14px] font-semibold text-text-primary mb-3">Recent activity</h3>
      <div className="flex flex-col gap-2.5">
        {recentActivity.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div
              className="w-2 h-2 rounded-full shrink-0 mt-1"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[13px] text-text-secondary leading-relaxed">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
