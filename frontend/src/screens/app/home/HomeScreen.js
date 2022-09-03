// REACT
import React from "react";

// COMPONENTS
import Carousel from "../../../components/carousel/Carousel";

// OTHERS
import "./home.css";

function HomeScreen() {
  return (
    <article className="home-container">
      <header>
        <h1>კატეგორიები</h1>
      </header>
      <Carousel category={{ category: "სახლები" }} />
      <Carousel category={{ category: "საღებავები" }} />
    </article>
  );
}

export default HomeScreen;
