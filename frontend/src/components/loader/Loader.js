import React from "react";
import "./loader.css";

function Loader({header,color}) {
  return (
    <div className="loader-container">
      <div className="loader" style={header && {  left: "80%"  }}  >
        <div className="inner one" style={{ borderBottomColor: color }}></div>
        <div className="inner two" style={{ borderRightColor: color }}></div>
        <div className="inner three" style={{ borderTopColor: color }}></div>
      </div>
    </div>
  );
}

export default Loader;
