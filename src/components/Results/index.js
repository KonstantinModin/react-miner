import { GameState } from "../../utilities/gameState";
import "./index.css";

const Results = ({ gameStats }) => {
  if (!gameStats || (!gameStats[GameState.Won] && gameStats[GameState.Lost]))
    return null;

  return (
    <div className="Results">
      <h3>Best times for current field size and mines percentage:</h3>
      {!!gameStats[GameState.Won].length && (
        <div className="ResultsBlock">
          <h4>Games win:</h4>
          <div>
            {gameStats[GameState.Won].map(({ sec }, idx) => (
              <div key={idx}>Total time: {sec} sec.</div>
            ))}
          </div>
        </div>
      )}
      {!!gameStats[GameState.Lost].length && (
        <div className="ResultsBlock">
          <h4>Games lost:</h4>
          <div>
            {gameStats[GameState.Lost].map(({ sec }, idx) => (
              <div key={idx}>Total time: {sec} sec.</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
