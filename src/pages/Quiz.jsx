import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUESTIONS } from './questions.js'
import { applyScore, computeTypeCode, initScores } from './mbti.js'
import ImageOption from './ImageOption.jsx'
import Progress from './Progress.jsx'

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

    if (idx + 1 < total) {
      setIdx(idx + 1)
      return
    }

    // 결과 공유/새로고침을 위해 code를 URL로 전달합니다.
    const code = computeTypeCode(nextScores)
    try {
      localStorage.setItem('diver-mbti:lastCode', code)
      localStorage.setItem('diver-mbti:lastScores', JSON.stringify(nextScores))
    } catch {
      // 저장 실패는 치명적이지 않음
    }
    nav(`/result?code=${encodeURIComponent(code)}`, { replace: true })
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