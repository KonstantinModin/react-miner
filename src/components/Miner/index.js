import React, { useEffect, useCallback } from "react";
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
    gameOver,
    setGameOver,
    size,
    minePercentage,
    triggerRestart,
    field,
    minesToGo,
    setField,
    setMinesToGo,
  } = props;
  const timeRef = React.useRef(Date.now());

  const finishGame = (result) => {
    setTimeout(() => alert(`game ${result ? "win" : "lost"}!`), 0);
    setGameOver(true);
  };

  const handleItemClick = useCallback(
    (y, x, count, e) => {
      e.preventDefault();

      const rightNow = Date.now();
      console.log("rightNow", rightNow);

      const diff = rightNow - timeRef.current;
      console.log("diff", diff);

      timeRef.current = rightNow;

      if (diff < 50) return; // handle only double click

      if (field[y][x].flag || gameOver) {
        return;
      }

      const updateItem = (y, x, updatedName, updatedValue) => {
        const newField = field.map((row) => row.slice());
        newField[y][x][updatedName] = updatedValue;
        setField(newField);
      };

      const aroundCoords = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      const checkedAround = [];

      const tryOpenAround = (y, x) => {
        aroundCoords.forEach(([deltaY, deltaX]) => {
          if (!field[y + deltaY] || !field[y + deltaY][x + deltaX]) {
            return;
          }

          // empty cell around clicked/ emty-opened before
          if (field[y + deltaY][x + deltaX].count === 0) {
            updateItem(y + deltaY, x + deltaX, "closed", false);
            if (
              checkedAround.some(
                (item) => item.y === y + deltaY && item.x === x + deltaX
              )
            ) {
              return;
            }
            checkedAround.push({ y: y + deltaY, x: x + deltaX });
            tryOpenAround(y + deltaY, x + deltaX);
          }

          // cell with number
          if (field[y + deltaY][x + deltaX].count) {
            updateItem(y + deltaY, x + deltaX, "closed", false);
          }
        });
      };

      if (e.buttons === 2) {
        console.log("two");
      } else {
        console.log("one");
      }

      if (e.type === "contextmenu") {
        return updateItem(y, x, "flag", !field[y][x].flag);
      }

      updateItem(y, x, "closed", false);
      if (field[y][x].mine) {
        return finishGame(false);
      } else {
        const allOpened = field.reduce(
          (res, row) => res + row.reduce((res, item) => res + +!item.closed, 0),
          0
        );
        console.log("allOpened", allOpened);
        if (size * size - allOpened === minesToGo) {
          return finishGame(true);
        }
        if (!field[y][x].count) {
          tryOpenAround(y, x);
        }
      }
    },
    [field, gameOver, minesToGo, size]
  );

  useEffect(() => {
    setGameOver(false);
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
    setMinesToGo(totalMinesCount);
  }, [size, minePercentage, triggerRestart]);

  return (
    <div className="Miner">
      {field &&
        field.map((row, idx) => (
          <Row key={idx} row={row} y={idx} handleItemClick={handleItemClick} />
        ))}
    </div>
  );
};

export default Miner;
