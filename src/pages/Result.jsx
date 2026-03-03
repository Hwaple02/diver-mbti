import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { computeTypeCode } from './mbti.js'
import { RESULTS } from './results.js'

export default function Result() {
  const loc = useLocation()
  const [copyMsg, setCopyMsg] = useState('')

  const codeFromQuery = useMemo(() => {
    const sp = new URLSearchParams(loc.search)
    const v = sp.get('code')
    return v ? v.toUpperCase() : ''
  }, [loc.search])

  const scoresFromState = loc.state?.scores

  const lastCode = useMemo(() => {
    try {
      return (localStorage.getItem('diver-mbti:lastCode') ?? '').toUpperCase()
    } catch {
      return ''
    }
  }, [])

  const scoresFromStorage = useMemo(() => {
    try {
      const raw = localStorage.getItem('diver-mbti:lastScores')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }, [])

  const derivedCode = useMemo(() => {
    if (codeFromQuery) return codeFromQuery
    if (scoresFromState) return computeTypeCode(scoresFromState)
    if (lastCode) return lastCode
    if (scoresFromStorage) return computeTypeCode(scoresFromStorage)
    return ''
  }, [codeFromQuery, scoresFromState, lastCode, scoresFromStorage])

  const code = derivedCode
  const detail = code ? RESULTS[code] : null

  if (!code) {
    return (
      <div className="card">
        <h1 className="h1">결과를 찾을 수 없습니다</h1>
        <p className="p">처음부터 다시 진행해 주세요. (공유 링크라면 code 파라미터가 필요합니다.)</p>
        <Link className="btn" to="/">홈으로</Link>
      </div>
    )
  }

  async function copyLink() {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopyMsg('복사 완료')
    } catch {
      setCopyMsg('복사 실패: 브라우저 권한을 확인하세요')
    } finally {
      window.setTimeout(() => setCopyMsg(''), 1600)
    }
  }

  if (!detail) {
    return (
      <div className="card">
        <h1 className="h1">당신의 결과 코드</h1>
        <div className="badge">{code}</div>
        <p className="p">해당 코드의 결과 데이터가 아직 없습니다. (results.js에 템플릿 추가 필요)</p>

        <div className="row">
          <Link className="btn btn--ghost" to="/">다시 하기</Link>
          <button className="btn" type="button" onClick={copyLink}>링크 복사</button>
        </div>
        {copyMsg && <p className="p" style={{ marginTop: 10 }}>{copyMsg}</p>}
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
          onClick={copyLink}
        >
          링크 복사
        </button>
      </div>

      {copyMsg && <p className="p" style={{ marginTop: 10 }}>{copyMsg}</p>}
    </div>
  )
}