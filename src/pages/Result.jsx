import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { computeTypeCode } from '../utils/mbti.js'
import { RESULTS } from '../data/results.js'

function clampHexColor(hex, fallback = '#2b64ff') {
  if (!hex) return fallback
  const v = String(hex).trim()
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback
}

function getThemeByCode(code) {
  const c = (code || '').toUpperCase()

  const l1 = c[0] || 'I' // E/I
  const l2 = c[1] || 'S' // A/S
  const l3 = c[2] || 'D' // B/D

  const axis = {
    EI: l1 === 'E'
      ? { accent: '#3b82f6', glow: 'rgba(59,130,246,.35)' }
      : { accent: '#60a5fa', glow: 'rgba(96,165,250,.25)' },

    AS: l2 === 'A'
      ? { tint: '#22c55e' }
      : { tint: '#06b6d4' },

    BD: l3 === 'B'
      ? { depth: '#2563eb' }
      : { depth: '#6366f1' },
  }

  const accent = axis.EI.accent
  const depth = axis.BD.depth
  const tint = axis.AS.tint

  return {
    accent,
    depth,
    tint,
    glow: axis.EI.glow,
    gradient: `linear-gradient(135deg, ${accent}22 0%, ${depth}22 45%, ${tint}22 100%)`,
    border: `linear-gradient(135deg, ${accent} 0%, ${depth} 55%, ${tint} 100%)`,
  }
}

export default function Result() {
  const loc = useLocation()
  const [copyMsg, setCopyMsg] = useState('')

  const codeFromQuery = useMemo(() => {
    const sp = new URLSearchParams(loc.search)
    return (sp.get('code') || '').toUpperCase()
  }, [loc.search])

  const lastCode = useMemo(() => {
    try {
      return (localStorage.getItem('diver-mbti:lastCode') || '').toUpperCase()
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
    if (lastCode) return lastCode
    if (scoresFromStorage) return computeTypeCode(scoresFromStorage)
    return ''
  }, [codeFromQuery, lastCode, scoresFromStorage])

  const code = derivedCode
  const detail = code ? RESULTS[code] : null
  const theme = useMemo(() => getThemeByCode(code), [code])

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyMsg('복사 완료')
    } catch {
      setCopyMsg('복사 실패 (브라우저 권한 확인)')
    }
    setTimeout(() => setCopyMsg(''), 1600)
  }

  if (!code) {
    return (
      <div className="card">
        <h1 className="h1">결과를 찾을 수 없습니다</h1>
        <p className="p">처음부터 다시 진행해 주세요.</p>
        <Link className="btn" to="/">홈으로</Link>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="card">
        <div
          className="resultHero"
          style={{
            backgroundImage: theme.gradient,
            boxShadow: `0 0 0 1px rgba(255,255,255,.04), 0 16px 48px ${theme.glow}`,
          }}
        >
          <div className="resultHero__top">
            <div className="resultCode" style={{ borderColor: clampHexColor(theme.accent) }}>
              {code}
            </div>
            <div className="resultHero__actions">
              <button className="btn btn--ghost" type="button" onClick={copyLink}>링크 복사</button>
              <Link className="btn" to="/">다시 하기</Link>
            </div>
          </div>

          <h2 className="resultTitle">결과 데이터가 없습니다</h2>
          <p className="resultSummary">results.js에 해당 코드 템플릿을 추가하세요.</p>
          {copyMsg && <div className="resultToast">{copyMsg}</div>}

          <div className="resultDivider" style={{ backgroundImage: theme.border }} aria-hidden="true" />
        </div>
      </div>
    )
  }

  const buddyType = detail?.buddy?.code || '' // 빈 값이면 괄호 숨김

  return (
    <div className="card">
      {/* HERO */}
      <div
        className="resultHero"
        style={{
          backgroundImage: theme.gradient,
          boxShadow: `0 0 0 1px rgba(255,255,255,.04), 0 16px 48px ${theme.glow}`,
        }}
      >
        <div className="resultHero__top">
          <div
            className="resultCode"
            style={{
              borderColor: clampHexColor(theme.accent),
              boxShadow: `0 0 0 2px ${theme.glow}`,
            }}
          >
            {detail.code ?? code}
          </div>

          <div className="resultHero__actions">
            <button className="btn btn--ghost" type="button" onClick={copyLink}>
              링크 복사
            </button>
            <Link className="btn" to="/">다시 하기</Link>
          </div>
        </div>

        <h2 className="resultTitle">{detail.title}</h2>
        <p className="resultSummary">{detail.summary}</p>

        {copyMsg && <div className="resultToast">{copyMsg}</div>}

        <div className="resultDivider" style={{ backgroundImage: theme.border }} aria-hidden="true" />
      </div>

      {/* Buddy (추천 VR 제거됨) */}
      <div className="resultCard resultCard--wide" style={{ marginTop: 14 }}>
        <div className="resultCard__label" style={{ color: clampHexColor(theme.accent) }}>
          환상의 버디
        </div>

        <div className="resultCard__content">
          {detail.buddy ? (
            <>
              <div className="resultBuddyName">
                {detail.buddy.name}
                {buddyType ? (
                  <span className="resultBuddyCode">({buddyType})</span>
                ) : null}
              </div>
              <div className="resultBuddyReason">{detail.buddy.reason}</div>
            </>
          ) : (
            '버디 정보가 준비 중입니다.'
          )}
        </div>
      </div>

      {/* Tips */}
      {Array.isArray(detail.tips) && detail.tips.length > 0 && (
        <div className="resultCard resultCard--wide" style={{ marginTop: 12 }}>
          <div className="resultCard__label" style={{ color: clampHexColor(theme.depth) }}>
            추천 가이드
          </div>
          <ul className="resultList">
            {detail.tips.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}