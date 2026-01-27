export default function ImageOption({ option, onSelect, selected }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={`opt ${selected ? 'opt--selected' : ''}`}
      aria-label={option.label}
    >
      <div className="opt__imgWrap">
        <img className="opt__img" src={option.img} alt={option.label} />
      </div>
      <div className="opt__label">{option.label}</div>
    </button>
  )
}
