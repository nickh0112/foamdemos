import { useEffect, useRef, useState } from 'react'
import { Sparkles, Minus, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { chatMessages } from '../../data/smart-explanation'

export default function FoamAssistPanel() {
  const [visibleMessages, setVisibleMessages] = useState<typeof chatMessages>([])
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    chatMessages.forEach((msg, i) => {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg])
      }, (i + 1) * 800)
      timers.push(timer)
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [visibleMessages])

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="rounded-xl bg-bg-card border border-border-card overflow-hidden flex flex-col flex-1 min-h-0"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-border-card shrink-0">
        <Sparkles className="w-4 h-4 text-brand-purple" />
        <span className="text-sm font-bold text-text-primary">Foam Assist</span>
        <div className="flex-1" />
        <button className="text-text-tertiary hover:text-text-secondary transition-colors bg-transparent border-0 cursor-pointer">
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Thread */}
      <div ref={threadRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {visibleMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.role === 'ai' ? (
              <div className="rounded-lg bg-brand-purple/5 border-l-[3px] border-brand-purple/20 p-3.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3 text-brand-purple" />
                  <span className="text-[11px] font-semibold text-brand-purple">{msg.name}</span>
                </div>
                <p className="text-[12px] text-[#c9d1d9] leading-relaxed whitespace-pre-line m-0">{msg.text}</p>
              </div>
            ) : (
              <div className="rounded-lg bg-bg-card-hover p-2.5">
                <span className="text-[11px] font-semibold text-text-secondary block mb-1">{msg.name}</span>
                <p className="text-[12px] text-text-primary leading-relaxed m-0">{msg.text}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border-card px-4 py-3 flex items-center gap-2 shrink-0">
        <span className="flex-1 text-[12px] text-text-tertiary">Ask anything about these metrics…</span>
        <Send className="w-3.5 h-3.5 text-brand-purple" />
      </div>
    </motion.div>
  )
}
