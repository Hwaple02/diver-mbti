import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz.jsx'
import Result from './pages/Result'

export default function App() {
  return (
    <div className="wrap">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
