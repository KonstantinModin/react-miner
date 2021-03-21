import React from "react";
import "./index.css";

const Overlay = ({ message, onClick }) => {
  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Overlay-contentWrapper">{message}</div>
    </div>
  );
};

export default Overlay;
