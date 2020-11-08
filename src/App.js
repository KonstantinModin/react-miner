import React, { useState, useEffect, useCallback } from "react";
import Miner from "./components/Miner";
import "./App.css";

const newItem = {
  closed: true,
  mine: false,
  count: null,
  flag: false,
};

const App = () => {
  const [size, setSize] = useState(6);
  const [minePercentage, setMinePercentage] = useState(10);

  const setSizeHandler = (e) => setSize(+e.target.value);
  const setMinePercentageHandler = (e) => setMinePercentage(+e.target.value);

  const [field, setField] = useState(null);

  const updateItem = useCallback(
    (y, x, updatedName, updatedValue) => {
      const newField = field.map((row) => row.slice());
      newField[y][x][updatedName] = updatedValue;
      setField(newField);
    },
    [field]
  );

  const handleItemClick = useCallback(
    (y, x, count) => {
      console.log(y, x, count);
      updateItem(y, x, "closed", false);
    },
    [updateItem]
  );

  useEffect(() => {
    const totalItemsCount = size * size;
    const totalMinesCount = ((totalItemsCount / 100) * minePercentage) | 0;
    console.log("totalItemsCount", totalItemsCount);
    console.log("totalMinesCount", totalMinesCount);

    const generateMines = (result = []) => {
      if (result.length === totalMinesCount) return result;
      const newMine = (Math.random() * totalItemsCount) | 0;
      return generateMines(
        result.includes(newMine) ? result : [...result, newMine]
      );
    };

    const generateField = () => {
      const mines = generateMines();
      console.log("mines", mines);

      const withMinesArray = [...Array(size)].map((_, y) =>
        [...Array(size)].map((_, x) => ({
          ...newItem,
          mine: mines.includes(x + y * size),
        }))
      );

      const countMinesAround = (y, x) => {
        const isMine = (y, x) => {
          return withMinesArray[y] && withMinesArray[y][x]?.mine ? 1 : 0;
        };

        return (
          isMine(y - 1, x - 1) +
          isMine(y - 1, x) +
          isMine(y - 1, x + 1) +
          isMine(y, x - 1) +
          isMine(y, x + 1) +
          isMine(y + 1, x - 1) +
          isMine(y + 1, x) +
          isMine(y + 1, x + 1)
        );
      };

      const withNumbersMinesArray = withMinesArray.map((row, y) =>
        row.map((item, x) => ({
          ...item,
          count: item.mine ? null : countMinesAround(y, x),
        }))
      );

      return withNumbersMinesArray;
    };
    setField(generateField());
  }, [size, minePercentage]);

  // console.log("field", field);

  return (
    <div className="App">
      <h1>React-mine</h1>
      <label>Field size</label>
      <input
        type="range"
        min={5}
        max={17}
        value={size}
        onChange={setSizeHandler}
      />
      <span>{size}</span>
      <label>Mines percentage</label>
      <input
        type="range"
        min={10}
        max={50}
        value={minePercentage}
        onChange={setMinePercentageHandler}
      />
      <span>{minePercentage}</span>
      <Miner field={field} handleItemClick={handleItemClick} />
    </div>
  );
};

export default App;
