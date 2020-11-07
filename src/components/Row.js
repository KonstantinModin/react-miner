import React from "react";

const Row = ({ row }) => {
  return (
    <div className="Miner-row">
      {row.map(({ opened, mine, count }, idx) => (
        <div key={idx} className={`Miner-item ${mine ? "red" : ""}`}>
          {mine ? "x" : "o"}
        </div>
      ))}
    </div>
  );
};

export default Row;
