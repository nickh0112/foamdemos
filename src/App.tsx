import { Routes, Route } from 'react-router'
import Landing from './Landing'
import SmartExplanationPage from './components/smart-explanation/SmartExplanationPage'
import PersonalNotesPage from './components/personal-notes/PersonalNotesPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/smart-explanation" element={<SmartExplanationPage />} />
      <Route path="/personal-notes" element={<PersonalNotesPage />} />
    </Routes>
  )
}
