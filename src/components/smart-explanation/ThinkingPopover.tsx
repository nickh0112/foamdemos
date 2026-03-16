import { motion } from 'framer-motion'
import ShimmerLoader from '../shared/ShimmerLoader'

export default function ThinkingPopover() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="rounded-[10px] bg-bg-card border border-[#8b5cf650] p-4 flex flex-col gap-3"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-semibold text-brand-purple">Engagement Bias</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-brand-purple">
          <path d="M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Shimmer bars */}
      <div className="flex flex-col gap-2.5">
        <ShimmerLoader width="100%" height={12} />
        <ShimmerLoader width="80%" height={12} />
        <ShimmerLoader width="60%" height={12} />
        <ShimmerLoader width="90%" height={12} />
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-1.5 pt-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-purple"
            style={{
              animation: 'pulse-dot 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
