import React from "react";
import Row from "./Row";

const Miner = ({ field }) => {
  return (
    <div className="Miner">
      {field && field.map((row, idx) => <Row key={idx} row={row} />)}
    </div>
  );
};

export default Miner;
