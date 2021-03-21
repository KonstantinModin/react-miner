import React, { useState } from "react";

import Miner from "./components/Miner";
import Header from "./components/Header";

import "./App.css";
import Overlay from "./components/Overlay";

const App = () => {
  const [size, setSize] = useState(6);
  const [minePercentage, setMinePercentage] = useState(10);
  const [minesAmount, setMinesAmount] = useState(null);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [field, setField] = useState(null);
  const [triggerRestart, setTriggerRestart] = useState(0);

  const flagsAmount =
    field &&
    field.reduce(
      (res, row) => res + row.reduce((res, item) => res + +item.flag, 0),
      0
    );

  // const gameWon =
  //   field &&
  //   field.every((row) =>
  //     row.every((item) => {
  //       if (item.mine) {
  //         return item.flag || item.closed;
  //       }
  //       return !item.closed;
  //     })
  //   );
  // console.log(`gameWon`, gameWon);

  // if (gameWon) {
  //   setGameOverMessage("You win!!!");
  // }

  const commonProps = { size, minePercentage, minesAmount, triggerRestart };
  const headerProps = {
    setSize,
    setMinePercentage,
    setTriggerRestart,
    setGameOverMessage,
    flagsAmount,
  };
  const minerProps = {
    gameOverMessage,
    setGameOverMessage,
    field,
    setField,
    setMinesAmount,
  };

  return (
    <div className="App">
      <Header {...headerProps} {...commonProps} />
      <Miner {...minerProps} {...commonProps} />
      {gameOverMessage && (
        <Overlay
          onClick={() => setGameOverMessage(null)}
          message={gameOverMessage}
        />
      )}
    </div>
  );
};

export default App;
