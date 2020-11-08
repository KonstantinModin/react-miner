import React from "react";
import Row from "./Row";

const Miner = ({ field, handleItemClick }) => {
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
