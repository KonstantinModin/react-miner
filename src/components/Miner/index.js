import React, { useEffect } from "react";
import Row from "../Row";
import "./index.css";

const newItem = {
  closed: true,
  mine: false,
  count: null,
  flag: false,
};

const Miner = (props) => {
  const {
    gameOverMessage,
    setGameOverMessage,
    size,
    minePercentage,
    triggerRestart,
    field,
    minesAmount,
    setField,
    setMinesAmount,
  } = props;

  // preparing field for new game
  useEffect(() => {
    setGameOverMessage("");
    const totalItemsCount = size * size;
    const totalMinesCount = ((totalItemsCount / 100) * minePercentage) | 0;

    const generateMines = (result = []) => {
      if (result.length === totalMinesCount) return result;
      const newMine = (Math.random() * totalItemsCount) | 0;
      return generateMines(
        result.includes(newMine) ? result : [...result, newMine]
      );
    };

    const generateField = () => {
      const mines = generateMines();

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
    setMinesAmount(totalMinesCount);
  }, [size, minePercentage, triggerRestart]);

  const rowProps = {
    field,
    setField,
    size,
    setGameOverMessage,
    gameOverMessage,
  };

  return (
    <div className="Miner">
      {field &&
        field.map((row, idx) => (
          <Row key={idx} row={row} y={idx} {...rowProps} />
        ))}
    </div>
  );
};

export default Miner;
