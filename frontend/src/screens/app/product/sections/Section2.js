import { useState } from "react";

function Section2({ product, styles }) {
  const [current, setCurrent] = useState(0);

  function renderSwitch(param) {
    switch (param) {
      case 0:
        return product.description_eng;
      case 1:
        return product.description_geo;
      case 2:
        return product.description_rus;
      default:
        return product.description_eng;
    }
  }
  return (
    <section className={styles.section2}>
      <header>
        <h2
          onClick={() => setCurrent(0)}
          style={current == 0 ? { fontWeight: "bold" } : {}}
        >
          ტექნიკური მონაცემები
        </h2>
        <h2
          onClick={() => setCurrent(1)}
          style={current == 1 ? { fontWeight: "bold" } : {}}
        >
          გამოყენების წესები
        </h2>
        <h2
          onClick={() => setCurrent(2)}
          style={current == 2 ? { fontWeight: "bold" } : {}}
        >
          უსაფრთხოების სტანდარტი
        </h2>
      </header>
      <p> {renderSwitch(current)}</p>
    </section>
  );
}

export default Section2;
