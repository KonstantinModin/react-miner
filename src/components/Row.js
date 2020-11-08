import React from "react";

const getCountClass = (count) => {
  switch (count) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    default:
      return "";
  }
};

const Row = ({ row, y, handleItemClick }) => {
  return (
    <div className="Miner-row">
      {row.map(({ closed, mine, count, flag }, x) => (
        <div
          key={x}
          className={`Miner-item ${
            flag
              ? "flag"
              : closed
              ? "closed"
              : mine
              ? "red"
              : count
              ? getCountClass(count)
              : ""
          }`}
          onClick={() => handleItemClick(y, x, count)}
        >
          {flag ? "f" : closed ? "" : mine ? "x" : count ? count : ""}
        </div>
      ))}
    </div>
  );
};

export default Row;
