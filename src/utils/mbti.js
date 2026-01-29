export function initScores() {
  return { E: 0, I: 0, A: 0, S: 0, B: 0, D: 0 }
}

export function applyScore(scores, delta) {
  const next = { ...scores }
  for (const k of Object.keys(delta)) {
    next[k] = (next[k] ?? 0) + delta[k]
  }
  return next
}

/**
 * 3축(E/I, A/S, B/D)에서 다득점 쪽을 선택해 코드 생성
 * 동점 처리 규칙은 tieBreak로 지정 (기본: I, S, D)
 */
export function computeTypeCode(scores, tieBreak = { EI: 'I', AS: 'S', BD: 'D' }) {
  const E = scores.E ?? 0, I = scores.I ?? 0
  const A = scores.A ?? 0, S = scores.S ?? 0
  const B = scores.B ?? 0, D = scores.D ?? 0

  const l1 = E === I ? tieBreak.EI : (E > I ? 'E' : 'I')
  const l2 = A === S ? tieBreak.AS : (A > S ? 'A' : 'S')
  const l3 = B === D ? tieBreak.BD : (B > D ? 'B' : 'D')

  return `${l1}${l2}${l3}` // 예: EAB, ISD, ESB, IAD
}
