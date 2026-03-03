import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { computeTypeCode } from '../utils/mbti.js'
import { RESULTS } from '../data/results.js'

export default function Result() {
  const loc = useLocation()
  const [copyMsg, setCopyMsg] = useState('')

  const codeFromQuery = useMemo(() => {
    const sp = new URLSearchParams(loc.search)
    return (sp.get('code') || '').toUpperCase()
  }, [loc.search])

  const lastCode = (localStorage.getItem('diver-mbti:lastCode') || '').toUpperCase()
  const rawScores = localStorage.getItem('diver-mbti:lastScores')
  const scoresFromStorage = rawScores ? JSON.parse(rawScores) : null

  const derivedCode = useMemo(() => {
    if (codeFromQuery) return codeFromQuery
    if (lastCode) return lastCode
    if (scoresFromStorage) return computeTypeCode(scoresFromStorage)
    return ''
  }, [codeFromQuery, lastCode, scoresFromStorage])

  const detail = RESULTS[derivedCode]

  if (!derivedCode) {
    return (
      <div className="card">
        <h1 className="h1">결과를 찾을 수 없습니다</h1>
        <Link className="btn" to="/">홈으로</Link>
      </div>
    )
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyMsg('복사 완료')
    } catch {
      setCopyMsg('복사 실패')
    }
    setTimeout(() => setCopyMsg(''), 1500)
  }

  return (
    <div className="card">
      <h1 className="h1">당신의 결과</h1>
      <div className="badge">{derivedCode}</div>

      <h2 className="h2">{detail?.title}</h2>
      <p className="p">{detail?.summary}</p>

      <div className="row">
        <Link className="btn btn--ghost" to="/">다시 하기</Link>
        <button className="btn" onClick={copyLink}>링크 복사</button>
      </div>

      {copyMsg && <p className="p">{copyMsg}</p>}
    </div>
  )
}