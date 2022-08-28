import { useRef } from "react";
import { GameState } from "../../utilities/gameState";
import aroundCords from "../../utilities/aroundCords";
import "./index.css";

const countClass = "-one-two-three-four-five-six-seven-eight".split`-`;

const Item = (props) => {
  const {
    item: { closed, mine, count, flag },
    gameState,
    y,
    x,
    field,
    setField,
  } = props;

  const timeRef = useRef(Date.now());

  const getFieldCopy = () =>
    field.map((row) => row.map((item) => ({ ...item })));

  const tryOpenAround = (y, x, fieldCopy, checkedAround) => {
    aroundCords.forEach(([deltaY, deltaX]) => {
      const currentY = y + deltaY;
      const currentX = x + deltaX;
      const isVisitedCell = checkedAround.some(
        (item) => item.y === currentY && item.x === currentX
      );

      if (
        !fieldCopy[currentY] ||
        !fieldCopy[currentY][currentX] ||
        isVisitedCell
      )
        return;

      fieldCopy[currentY][currentX].closed = false;

      // non-number (empty) cell
      if (!fieldCopy[currentY][currentX].count) {
        checkedAround.push({ y: currentY, x: currentX });
        tryOpenAround(currentY, currentX, fieldCopy, checkedAround);
      }
    });
  };

  const handleTwoButtonsClick = (y, x) => {
    const { count, closed } = field[y][x];
    if (!count || closed) return;

    const flagsAround = aroundCords.reduce((res, [deltaY, deltaX]) => {
      if (!field[y + deltaY] || !field[y + deltaY][x + deltaX]) {
        return res;
      }
      return res + +field[y + deltaY][x + deltaX].flag;
    }, 0);

    if (count !== flagsAround) return;

    const fieldCopy = getFieldCopy();
    const checkedAround = [];

    aroundCords.forEach(([deltaY, deltaX]) => {
      const currentItem =
        fieldCopy[y + deltaY] && fieldCopy[y + deltaY][x + deltaX];
      if (currentItem && !currentItem.flag) {
        currentItem.closed = false;

        // open more only for non-number cell
        if (!currentItem.count) {
          tryOpenAround(y + deltaY, x + deltaX, fieldCopy, checkedAround);
        }
      }
    });
    setField(fieldCopy);
  };

  const handleRightClick = (y, x) => {
    const { closed, flag } = field[y][x];
    if (!closed) return;

    const fieldCopy = getFieldCopy();
    fieldCopy[y][x].flag = !flag;
    setField(fieldCopy);
  };

  const handleLeftClick = (y, x) => {
    const { flag, count, mine } = field[y][x];
    if (flag) return;

    const checkedAround = [];
    const fieldCopy = getFieldCopy();

    fieldCopy[y][x].closed = false;

    if (!count && !mine) {
      tryOpenAround(y, x, fieldCopy, checkedAround);
    }
    setField(fieldCopy);
  };

  const handleItemClick = (y, x, e) => {
    e.preventDefault();
    const { closed, count } = field[y][x];
    if (gameState !== GameState.Active || (!closed && !count)) return;

    // handle only one click of 2 buttons pressed
    const rightNow = Date.now();
    const diff = rightNow - timeRef.current;
    timeRef.current = rightNow;
    if (diff < 50) return;

    // Two buttons clicked
    if (e.buttons === 2) {
      return handleTwoButtonsClick(y, x);
    }

    // Right click
    if (e.type === "contextmenu") {
      return handleRightClick(y, x);
    }

    // Left click
    handleLeftClick(y, x);
  };

  const getClassName = () =>
    `Miner-item ${
      gameState === GameState.Lost && mine
        ? "mine"
        : (gameState === GameState.Won && mine) || flag
        ? "flag"
        : closed
        ? "closed"
        : mine
        ? "mine"
        : count
        ? countClass[count]
        : ""
    }`;

  const getContent = () => !closed && count > 0 && count;

  return (
    <div
      className={getClassName()}
      onClick={(e) => handleItemClick(y, x, e)}
      onContextMenu={(e) => handleItemClick(y, x, e)}
    >
      {getContent()}
    </div>
  );
};

export default Item;
