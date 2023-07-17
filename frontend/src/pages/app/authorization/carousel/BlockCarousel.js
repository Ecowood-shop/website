// REACT
import React, { useState, useEffect, useRef } from "react";

// OTHERS
import { data } from "./data.js";
import { Animation } from "../../../../functions/Animation.js";
import "./block-carousel.css";

function BlockCarousel() {
  const [id, setId] = useState(0);

  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        Animation(["blockCarousel-img", "blockCarousel-text"], "right", () =>
          setId(id == 3 ? 0 : id + 1)
        ),

      10000
    );

    return () => {
      resetTimeout();
    };
  }, [id]);

  return (
    <div className="blockCarousel-container w3-animate-right">
      <img src={data[id].img} alt="Blog Quote image" id="blockCarousel-img" />
      <blockquote
        id="blockCarousel-text"
        className="blockCarousel-post  w3-animate-right custom-animation"
      >
        <p className="blockCarousel-text">{data[id].text}</p>
        <p className="blockCarousel-author">{data[id].author}</p>
        <p className="blockCarousel-job">{data[id].job}</p>
      </blockquote>
      <button
        className="blockCarousel-btn btn--left"
        onClick={() =>
          Animation(["blockCarousel-img", "blockCarousel-text"], "left", () =>
            setId(id == 0 ? 3 : id - 1)
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="btn-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="blockCarousel-btn btn--right"
        onClick={() => {
          Animation(["blockCarousel-img", "blockCarousel-text"], "right", () =>
            setId(id == 3 ? 0 : id + 1)
          );
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="btn-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="blockCarousel-dots">
        {data.map((x) => (
          <button
            key={x.id}
            className={
              id == x.id ? "blockCarousel-dot dot--fill" : "blockCarousel-dot"
            }
            onClick={() =>
              Animation(
                ["blockCarousel-img", "blockCarousel-text"],
                "right",
                () => setId(x.id)
              )
            }
          >
            &nbsp;
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlockCarousel;
