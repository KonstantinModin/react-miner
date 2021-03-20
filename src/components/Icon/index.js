import React from "react";
import flag from "../../img/flag.png";
import mine from "../../img/mine.png";
import "./index.css";

const style = {
  width: "80%",
};

const Icon = ({ icon }) => {
  const getIcon = () => {
    switch (icon) {
      case "flag":
        return flag;
      case "mine":
        return mine;
      default:
        return null;
    }
  };
  return <img className="Icon" style={style} src={getIcon()} alt="icon" />;
};

export default Icon;
