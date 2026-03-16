import { Link } from 'react-router'
import { Sparkles, Search } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg-app flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-text-primary">Foam Prototypes</h1>
          <p className="text-text-secondary text-sm">Interactive design explorations</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Link
            to="/smart-explanation"
            className="group block rounded-xl bg-bg-card border border-border-card p-6 hover:border-brand-purple/50 transition-colors no-underline"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-purple/20 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-brand-purple" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Smart Explanation</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              AI-powered metric explanations with "Ask Foam" flow, thinking states, and Go Deeper suggestions.
            </p>
          </Link>

          <Link
            to="/personal-notes"
            className="group block rounded-xl bg-bg-card border border-border-card p-6 hover:border-brand-blue/50 transition-colors no-underline"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-blue/20 flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-brand-blue" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">Personal Notes Search</h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Talent search with expandable detail shelves, criteria evidence, and content citations.
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
