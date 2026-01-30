export default function EnterButton({ onClick }) {
  return (
    <div className="enter-button">
      <div className="enter-button__circle" onClick={onClick}>
        <span className="enter-button__icon">&#x2192;</span>
      </div>
      <div className="enter-button__text">Urunleri Incele</div>
    </div>
  );
}
