export function initScores() {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
}

export function applyScore(scores, delta) {
  const next = { ...scores }
  for (const k of Object.keys(delta)) {
    next[k] = (next[k] ?? 0) + delta[k]
  }
  return next
}

export function computeMbti(scores, tieBreak = { EI: 'I', SN: 'S', TF: 'T', JP: 'J' }) {
  const { E, I, S, N, T, F, J, P } = scores
  const l1 = E === I ? tieBreak.EI : (E > I ? 'E' : 'I')
  const l2 = S === N ? tieBreak.SN : (S > N ? 'S' : 'N')
  const l3 = T === F ? tieBreak.TF : (T > F ? 'T' : 'F')
  const l4 = J === P ? tieBreak.JP : (J > P ? 'J' : 'P')
  return `${l1}${l2}${l3}${l4}`
}
