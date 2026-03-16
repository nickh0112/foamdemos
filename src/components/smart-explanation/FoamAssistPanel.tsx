import { useEffect, useRef, useState } from 'react'
import { Sparkles, Minus, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { metricExplanations, type MetricKey } from '../../data/smart-explanation'

interface Message {
  role: 'ai' | 'user'
  name: string
  text: string
}

interface Props {
  metric?: MetricKey | null
  suggestedQuestion?: string | null
}

export default function FoamAssistPanel({ metric, suggestedQuestion }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const threadRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Seed initial AI message from the metric explanation
  useEffect(() => {
    if (!metric) return
    const data = metricExplanations[metric]
    const initialMsg: Message = {
      role: 'ai',
      name: 'Foam Assist',
      text: data.explanation.aiReply,
    }
    // Show initial AI reply near-instantly
    const timer = setTimeout(() => {
      setMessages([initialMsg])
      // Pre-fill the suggested question if provided
      if (suggestedQuestion) {
        setInputValue(suggestedQuestion)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [metric, suggestedQuestion])

  // Auto-scroll on new messages
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight
    }
  }, [messages])

  // Focus the input after messages load
  useEffect(() => {
    if (messages.length > 0 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [messages])

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text || !metric) return

    const userMsg: Message = { role: 'user', name: 'You', text }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')

    // Simulate AI thinking + reply
    const data = metricExplanations[metric]
    setTimeout(() => {
      const aiMsg: Message = {
        role: 'ai',
        name: 'Foam Assist',
        text: text === data.explanation.nudge.question
          ? data.explanation.aiReply
          : `That's a great question about ${data.label.toLowerCase()}. Based on the data I've analyzed, ${data.explanation.sections.find(s => s.type === 'insight')?.text || 'the current metrics suggest room for further investigation.'}`,
      }
      setMessages((prev) => [...prev, aiMsg])
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="rounded-xl bg-bg-card border border-border-card overflow-hidden flex flex-col flex-1 min-h-0"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-border-card border-t-2 border-t-brand-purple shrink-0">
        <motion.div
          animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Sparkles className="w-4 h-4 text-brand-purple" />
        </motion.div>
        <span className="text-sm font-bold text-text-primary">Foam Assist</span>
        <div className="flex-1" />
        <button className="text-text-tertiary hover:text-text-secondary transition-colors bg-transparent border-0 cursor-pointer">
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Thread */}
      <div ref={threadRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, i) => (
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
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about these metrics…"
          className="flex-1 text-[12px] text-text-primary placeholder:text-text-tertiary bg-transparent border-0 outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-transparent border-0 cursor-pointer p-0 text-brand-purple hover:text-[#c4b5fd] transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
