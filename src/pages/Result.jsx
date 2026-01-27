import { Link, useLocation } from 'react-router-dom'
import { computeMbti } from '../utils/mbti'
import { RESULTS } from '../data/results'

export default function Result() {
  const loc = useLocation()
  const scores = loc.state?.scores

  if (!scores) {
    return (
      <div className="card">
        <h1 className="h1">결과를 찾을 수 없습니다</h1>
        <p className="p">처음부터 다시 진행해 주세요.</p>
        <Link className="btn" to="/">홈으로</Link>
      </div>
    )
  }

  const mbti = computeMbti(scores)
  const detail = RESULTS[mbti] ?? {
    title: `${mbti}`,
    summary: 'results.js에 이 유형 설명을 추가하면 결과가 풍부해집니다.',
    tips: ['RESULTS 객체에 해당 유형을 추가해 주세요.'],
  }

  return (
    <div className="card">
      <h1 className="h1">당신의 타입</h1>
      <div className="badge">{mbti}</div>

      <h2 className="h2">{detail.title}</h2>
      <p className="p">{detail.summary}</p>

      <h3 className="h3">추천 가이드</h3>
      <ul className="list">
        {detail.tips.map((t, i) => <li key={i}>{t}</li>)}
      </ul>

      <div className="row">
        <Link className="btn btn--ghost" to="/">다시 하기</Link>
        <button
          className="btn"
          type="button"
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        >
          링크 복사
        </button>
      </div>
    </div>
  )
}
