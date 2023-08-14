import React from "react";
import "./loader.css";

function Loader({ color, top, flex }) {
  return (
    <div className="loader-mini-Container" style={{ flex: flex }}>
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
