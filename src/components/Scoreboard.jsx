import "../styles/Scoreboard.css";

function Scoreboard({ score, bestScore }) {
  return (
    <div className="scoreboard">
      <div className="score-box">
        <p className="score-label">Score</p>
        <p className="score-value">{score}</p>
      </div>
      <div className="score-box">
        <p className="score-label">Best Score</p>
        <p className="score-value">{bestScore}</p>
      </div>
    </div>
  );
}

export default Scoreboard;