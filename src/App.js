import React, { useState } from "react";

import Miner from "./components/Miner";
import Header from "./components/Header";

import "./App.css";

const App = () => {
  const [size, setSize] = useState(6);
  const [minePercentage, setMinePercentage] = useState(10);
  const [minesToGo, setMinesToGo] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [field, setField] = useState(null);
  const [triggerRestart, setTriggerRestart] = useState(0);

  const commonProps = { size, minePercentage, minesToGo, triggerRestart };
  const headerProps = {
    setSize,
    setMinePercentage,
    setTriggerRestart,
    setGameOver,
  };
  const minerProps = { gameOver, setGameOver, field, setField, setMinesToGo };

  return (
    <div className="App">
      <Header {...headerProps} {...commonProps} />
      <Miner {...minerProps} {...commonProps} />
    </div>
  );
};

export default App;
