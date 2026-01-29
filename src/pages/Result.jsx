import { Link, useLocation } from 'react-router-dom'
import { computeTypeCode } from '../utils/mbti'
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

  const code = computeTypeCode(scores) // 예: EAB, ISD, ESB, IAD
  const detail = RESULTS[code]

  if (!detail) {
    return (
      <div className="card">
        <h1 className="h1">당신의 결과 코드</h1>
        <div className="badge">{code}</div>

        <p className="p">
          results.js에 <b>{code}</b> 결과 템플릿을 추가해 주세요.
        </p>

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

  return (
    <div className="card">
      <h1 className="h1">당신의 결과</h1>
      <div className="badge">{detail.code ?? code}</div>

      <h2 className="h2">{detail.title}</h2>
      <p className="p">{detail.summary}</p>

      {detail.recommend && (
        <>
          <h3 className="h3">추천 VR</h3>
          <p className="p">{detail.recommend}</p>
        </>
      )}

      {detail.buddy && (
        <>
          <h3 className="h3">환상의 버디</h3>
          <p className="p">
            <b>{detail.buddy.name}</b> — {detail.buddy.reason}
          </p>
        </>
      )}

      {Array.isArray(detail.tips) && detail.tips.length > 0 && (
        <>
          <h3 className="h3">추천 가이드</h3>
          <ul className="list">
            {detail.tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </>
      )}

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
