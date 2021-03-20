import React from "react";
import Icon from "../Icon";

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
          onClick={(e) => handleItemClick(y, x, count, e)}
          onContextMenu={(e) => handleItemClick(y, x, count, e)}
        >
          {flag ? (
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
