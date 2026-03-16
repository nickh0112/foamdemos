import { useReducer, useCallback, useRef, useEffect } from 'react'
import type { BaseCreator, CriterionDef, CreatorEvaluation } from '../data/creators'

export type CellRevealState = 'empty' | 'scanning' | 'revealed'

type CellAction =
  | { type: 'scan'; key: string }
  | { type: 'reveal'; key: string }
  | { type: 'reset' }

function cellReducer(state: Map<string, CellRevealState>, action: CellAction): Map<string, CellRevealState> {
  switch (action.type) {
    case 'scan': {
      const next = new Map(state)
      next.set(action.key, 'scanning')
      return next
    }
    case 'reveal': {
      const next = new Map(state)
      next.set(action.key, 'revealed')
      return next
    }
    case 'reset':
      return new Map()
    default:
      return state
  }
}

interface ScheduledCell {
  creatorId: string
  criterionKey: string
  scanStartMs: number
  revealMs: number
}

function buildSchedule(creators: BaseCreator[], criteria: CriterionDef[]): ScheduledCell[] {
  const cells: ScheduledCell[] = []

  // Build cells grouped by criterion, shuffled within each group
  for (const criterion of criteria) {
    const creatorIds = creators.map((c) => c.id)
    // Fisher-Yates shuffle
    for (let i = creatorIds.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[creatorIds[i], creatorIds[j]] = [creatorIds[j], creatorIds[i]]
    }
    for (const creatorId of creatorIds) {
      cells.push({ creatorId, criterionKey: criterion.key, scanStartMs: 0, revealMs: 0 })
    }
  }

  // Partial interleaving: swap some adjacent pairs from different criterion groups
  for (let i = 0; i < cells.length - 1; i++) {
    if (cells[i].criterionKey !== cells[i + 1].criterionKey && Math.random() < 0.4) {
      ;[cells[i], cells[i + 1]] = [cells[i + 1], cells[i]]
    }
  }

  // Assign timing: ~130ms spacing, 400-800ms scan duration
  const spacing = 130
  for (let i = 0; i < cells.length; i++) {
    const scanStart = i * spacing
    const scanDuration = 400 + Math.random() * 400
    cells[i].scanStartMs = scanStart
    cells[i].revealMs = scanStart + scanDuration
  }

  return cells
}

interface UseInvestigationResult {
  cellStates: Map<string, CellRevealState>
  revealedScores: Set<string>
  start: () => void
  isComplete: boolean
}

export function useInvestigation(
  creators: BaseCreator[],
  criteria: CriterionDef[],
  _evaluations: CreatorEvaluation[]
): UseInvestigationResult {
  const [cellStates, dispatch] = useReducer(cellReducer, new Map<string, CellRevealState>())
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const revealedScoresRef = useRef<Set<string>>(new Set())
  const isCompleteRef = useRef(false)
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0)

  // Track revealed criteria per creator to know when scores should appear
  const revealedCriteriaRef = useRef<Map<string, Set<string>>>(new Map())

  const cleanup = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }, [])

  useEffect(() => cleanup, [cleanup])

  const start = useCallback(() => {
    cleanup()
    dispatch({ type: 'reset' })
    revealedScoresRef.current = new Set()
    revealedCriteriaRef.current = new Map()
    isCompleteRef.current = false
    forceUpdate()

    const schedule = buildSchedule(creators, criteria)
    const totalCells = schedule.length
    let revealedCount = 0

    for (const cell of schedule) {
      const cellKey = `${cell.creatorId}:${cell.criterionKey}`

      // Schedule scan start
      const scanTimer = setTimeout(() => {
        dispatch({ type: 'scan', key: cellKey })
      }, cell.scanStartMs)
      timersRef.current.push(scanTimer)

      // Schedule reveal
      const revealTimer = setTimeout(() => {
        dispatch({ type: 'reveal', key: cellKey })
        revealedCount++

        // Track per-creator criteria completion
        if (!revealedCriteriaRef.current.has(cell.creatorId)) {
          revealedCriteriaRef.current.set(cell.creatorId, new Set())
        }
        revealedCriteriaRef.current.get(cell.creatorId)!.add(cell.criterionKey)

        // Check if all criteria for this creator are revealed
        if (revealedCriteriaRef.current.get(cell.creatorId)!.size === criteria.length) {
          const scoreTimer = setTimeout(() => {
            revealedScoresRef.current = new Set(revealedScoresRef.current).add(cell.creatorId)
            forceUpdate()

            // Check if all cells done
            if (revealedCount >= totalCells && revealedScoresRef.current.size === creators.length) {
              isCompleteRef.current = true
              forceUpdate()
            }
          }, 200)
          timersRef.current.push(scoreTimer)
        }
      }, cell.revealMs)
      timersRef.current.push(revealTimer)
    }
  }, [creators, criteria, cleanup])

  return {
    cellStates,
    revealedScores: revealedScoresRef.current,
    start,
    isComplete: isCompleteRef.current,
  }
}
