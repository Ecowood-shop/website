// REACT
import React from "react";

// COMPONENTS
import Carousel from "../../../components/carousel/Carousel";

// OTHERS
import "./home.css";

function HomeScreen() {
  return (
    <article className="home-container">
      <Carousel category={{ category: "სახლები" }} />
      <Carousel category={{ category: "სამონტაჟო აქსესუარები" }} />
    </article>
  );
}

export default HomeScreen;
