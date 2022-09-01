// REACT
import React from "react";

// OTHERS
import "./message.css";

function Message({ children }) {
  return (
    <div className="message">
    {children &&  <p>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {children}
      </p>}
    </div>
  );
}

export default Message;
