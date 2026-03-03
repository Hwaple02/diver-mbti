import { Routes, Route, Navigate } from 'react-router-dom'
// 이 프로젝트는 단일 폴더(Flat) 구조로 파일이 배치되어 있습니다.
// 따라서 pages/components/utils/data 같은 폴더 기준 import 대신 현재 경로로 맞춥니다.
import Home from './Home.jsx'
import Quiz from './Quiz.jsx'
import Result from './Result.jsx'

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