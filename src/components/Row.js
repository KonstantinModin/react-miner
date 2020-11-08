import React from "react";

const Row = ({ row, y }) => {
  return (
    <div className="Miner-row">
      {row.map(({ opened, mine, count }, x) => (
        <div
          key={x}
          className={`Miner-item ${mine ? "red" : ""}`}
          onClick={() => console.log(y, x)}
        >
          {mine ? "x" : count ? count : ""}
        </div>
      ))}
    </div>
  );
};

export default Row;
