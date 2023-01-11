import React from "react";
import "./loader.css";

function Loader({ header, height, color }) {
  return (
    <div
      className="loader-Container"
      style={height ? { height: "10rem" } : header ? { marginLeft: "auto",marginRight:"5rem" } : {}}
    >
      <div className="loader-container">
        <div className="loader">
          <div className="inner one" style={{ borderBottomColor: color }}></div>
          <div className="inner two" style={{ borderRightColor: color }}></div>
          <div className="inner three" style={{ borderTopColor: color }}></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
