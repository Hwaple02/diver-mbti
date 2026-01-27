export default function Progress({ current, total }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="progress">
      <div className="progress__top">
        <span>{current}/{total}</span>
        <span>{pct}%</span>
      </div>
      <div className="progress__bar">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
