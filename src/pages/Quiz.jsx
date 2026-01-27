import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { applyScore, initScores } from '../utils/mbti'
import ImageOption from '../components/ImageOption'
import Progress from '../components/Progress'

export default function Quiz() {
  const nav = useNavigate()
  const total = QUESTIONS.length

  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scores, setScores] = useState(initScores())

  const q = QUESTIONS[idx]
  const selectedOptionId = answers[q.id]
  const canGoPrev = idx > 0

  const optionById = useMemo(() => {
    const map = {}
    for (const qq of QUESTIONS) for (const opt of qq.options) map[opt.id] = opt
    return map
  }, [])

  function recomputeScores(nextAnswers) {
    let s = initScores()
    for (const qq of QUESTIONS) {
      const oid = nextAnswers[qq.id]
      if (!oid) continue
      const opt = optionById[oid]
      if (opt?.score) s = applyScore(s, opt.score)
    }
    return s
  }

  function handleSelect(option) {
    const nextAnswers = { ...answers, [q.id]: option.id }
    const nextScores = recomputeScores(nextAnswers)

    setAnswers(nextAnswers)
    setScores(nextScores)

    if (idx + 1 < total) setIdx(idx + 1)
    else nav('/result', { state: { scores: nextScores } })
  }

  function goPrev() {
    if (!canGoPrev) return
    setIdx(idx - 1)
  }

  return (
    <div className="card">
      <Progress current={idx + 1} total={total} />
      <h2 className="h2">{q.title}</h2>

      <div className="grid">
        {q.options.map(opt => (
          <ImageOption
            key={opt.id}
            option={opt}
            selected={selectedOptionId === opt.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="row">
        <button className="btn btn--ghost" onClick={goPrev} disabled={!canGoPrev}>
          이전
        </button>
        <div className="hint">이미지를 클릭하면 다음으로 이동합니다.</div>
      </div>
    </div>
  )
}
