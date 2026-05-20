import './SpotlightCard.css';

export default function SpotlightCard({ children, className = '', unit = 'U?' }) {
  return (
    <div className={`spotlight-card ${className}`}>
      {/* Corner fold */}
      <span className="spotlight-card__fold" aria-hidden="true" />
      {/* Diagonal stripe hover layer */}
      <span className="spotlight-card__stripe" aria-hidden="true" />
      <span className="rack-unit-id">{unit}</span>
      {children}
    </div>
  );
}
