import "../styles/Card.css";

function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={() => onClick(pokemon.id)}>
      <img src={pokemon.image} alt={pokemon.name} />
      <p className="card-name">{pokemon.name}</p>
    </div>
  );
}

export default Card;