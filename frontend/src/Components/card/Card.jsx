import "./card.css";
export default function Card({ title }) {
  return (
    <div className="card-container">
      <div className="card-info">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
}
