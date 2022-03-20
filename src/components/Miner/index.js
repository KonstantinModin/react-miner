import { useEffect } from 'react';
import Row from '../Row';
import { GameState } from '../../utilities/gameState';
import aroundCords from '../../utilities/aroundCords';

const newItem = {
  closed: true,
  mine: false,
  count: null,
  flag: false,
};

const Miner = (props) => {
  const {
    gameState,
    setGameState,
    size,
    minePercentage,
    triggerRestart,
    field,
    setField,
    setMinesAmount,
    setShouldShowOverlay,
    setGameStarted,
    setIsTimerTicking,
  } = props;

  // preparing field for new game
  useEffect(() => {
    setGameState(GameState.Active);
    setIsTimerTicking(true);
    setShouldShowOverlay(true);
    setGameStarted(null);
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

      const countMinesAround = (y, x) =>
        aroundCords.reduce((res, [deltaY, deltaX]) => {
          const currentItem =
            withMinesArray[deltaY + y] &&
            withMinesArray[deltaY + y][deltaX + x];
          return res + (currentItem ? +currentItem.mine : 0);
        }, 0);

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
    gameState,
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
