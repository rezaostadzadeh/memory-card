import { useState, useEffect } from "react";
import Card from "./components/Card";
import Scoreboard from "./components/Scoreboard";
import "./styles/Card.css";

const POKEMON_COUNT = 12;
const MAX_POKEMON_ID = 150;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomIds(count, max) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return [...ids];
}

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [clickedIds, setClickedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return Number(localStorage.getItem("memoryCardBestScore")) || 0;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemons();
  }, []);

  function fetchPokemons() {
    setIsLoading(true);
    const ids = getRandomIds(POKEMON_COUNT, MAX_POKEMON_ID);

    Promise.all(
      ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
      )
    ).then((results) => {
      const formatted = results.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.sprites.front_default,
      }));
      setPokemons(formatted);
      setIsLoading(false);
    });
  }

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem("memoryCardBestScore", score);
      }
      setScore(0);
      setClickedIds([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedIds([...clickedIds, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("memoryCardBestScore", newScore);
      }
    }

    setPokemons((prev) => shuffle(prev));
  }

  return (
    <div className="page">
      <h1 style={{ textAlign: "center", marginBottom: "8px" }}>Pokémon Memory Game</h1>
      <p style={{ textAlign: "center", color: "var(--ink-soft)", marginBottom: "32px" }}>
        Click each card once. Click the same one twice and you lose!
      </p>

      <Scoreboard score={score} bestScore={bestScore} />

      {isLoading ? (
        <p style={{ textAlign: "center" }}>Loading Pokémon...</p>
      ) : (
        <div className="card-grid">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} onClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;