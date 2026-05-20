import './ChannelLabel.css';

export default function ChannelLabel({ label, index }) {
  return (
    <div className="channel-label">
      <span className="channel-label__text">{label}</span>
      <span className="channel-label__rule" aria-hidden="true" />
      <span className="channel-label__index">[{index}]</span>
    </div>
  );
}
