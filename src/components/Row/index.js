import React from "react";
import Icon from "../Icon";

const countClass = "-one-two-three-four-five-six-seven-eight".split`-`;

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

const Row = (props) => {
  const {
    row,
    y,
    field,
    setField,
    size,
    minesAmount,
    gameOverMessage,
    setGameOverMessage,
  } = props;

  const finishGame = (result) => {
    setGameOverMessage(result);
  };

  const timeRef = React.useRef(Date.now());

  const updateItem = (yToUpdate, xToUpdate, updatedName, updatedValue) => {
    console.count("updateItem");

    const newField = field.map((row, yLocal) =>
      row.map((item, xLocal) =>
        yToUpdate === yLocal && xToUpdate === xLocal
          ? { ...item, [updatedName]: updatedValue }
          : item
      )
    );
    // console.log(`field`, field);
    // console.log(`newField`, newField);
    setField(newField);
  };

  const handleTwoButtonsClick = (y, x, e) => {
    const { count, closed } = field[y][x];
    if (!count || closed) return;

    console.log("Two button Clicked");
    const minesAround = aroundCoords.reduce((res, [deltaY, deltaX]) => {
      if (!field[y + deltaY] || !field[y + deltaY][x + deltaX]) {
        return res;
      }
      return res + +field[y + deltaY][x + deltaX].mine;
    }, 0);

    console.log(`count`, count);
    console.log(`minesAround`, minesAround);
  };

  const handleRightClick = (y, x, e) => {
    const { closed, flag } = field[y][x];
    if (!closed) return;

    updateItem(y, x, "flag", !flag);
  };

  const handleLeftClick = (y, x, e) => {
    const { flag } = field[y][x];
    if (flag) return;

    const checkedAround = [];

    const fieldCopy = field.map((row) => row.map((item) => ({ ...item })));

    const tryOpenAround = (y, x) => {
      aroundCoords.forEach(([deltaY, deltaX]) => {
        if (!field[y + deltaY] || !field[y + deltaY][x + deltaX]) {
          return;
        }

        // empty cell around clicked/ emty-opened before
        if (field[y + deltaY][x + deltaX].count === 0) {
          fieldCopy[y + deltaY][x + deltaX].closed = false;
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
          fieldCopy[y + deltaY][x + deltaX].closed = false;
        }
      });
    };

    fieldCopy[y][x].closed = false;
    setField(fieldCopy);
    if (field[y][x].mine) {
      return finishGame("You lost!!!");
    }

    if (!field[y][x].count) {
      tryOpenAround(y, x);
    }
  };

  const handleItemClick = (y, x, e) => {
    e.preventDefault();
    const { closed, count } = field[y][x];
    if (gameOverMessage || gameOverMessage === null || (!closed && !count)) {
      return;
    }

    const rightNow = Date.now();
    // console.log("rightNow", rightNow);
    const diff = rightNow - timeRef.current;
    // console.log("diff", diff);
    timeRef.current = rightNow;
    if (diff < 50) return; // handle only one click of 2 buttons pressed

    // Two buttons clicked
    if (e.buttons === 2) {
      return handleTwoButtonsClick(y, x, e);
    }

    // Right click
    if (e.type === "contextmenu") {
      return handleRightClick(y, x, e);
    }

    // Left click
    handleLeftClick(y, x, e);
  };

  return (
    <div className="Miner-row">
      {row.map(({ closed, mine, count, flag }, x) => (
        <div
          key={`${y}-${x}`}
          className={`Miner-item ${
            gameOverMessage && mine
              ? "red"
              : flag
              ? "flag"
              : closed
              ? "closed"
              : mine
              ? "red"
              : count
              ? countClass[count]
              : ""
          }`}
          onClick={(e) => handleItemClick(y, x, e)}
          onContextMenu={(e) => handleItemClick(y, x, e)}
        >
          {gameOverMessage && mine ? (
            <Icon icon="mine" />
          ) : flag ? (
            <Icon icon="flag" />
          ) : closed ? (
            ""
          ) : mine ? (
            <Icon icon="mine" />
          ) : count ? (
            count
          ) : (
            ""
          )}
          {/* <span>{mine ? "x" : count ? count : ""}</span> */}
        </div>
      ))}
    </div>
  );
};

export default Row;
