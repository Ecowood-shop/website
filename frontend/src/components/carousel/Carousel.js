// REACT
import React from "react";
import ReactCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// COMPONENTS
import Product from "./product/Product";

// OTHERS
import "./carousel.css";

function Carousel(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1420 },
      items: 4,
    },
    notebook: {
      breakpoint: { max: 1420, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="carousel-container w3-animate-right">
      <header>
        <h1>{props.category.category}</h1>
        <button>სრულად</button>
      </header>
      <ReactCarousel responsive={responsive} className="carousel ">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </ReactCarousel>
    </section>
  );
}

export default Carousel;
