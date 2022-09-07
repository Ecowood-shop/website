// REACT
import React from "react";

// COMPONENTS
import Filter from "../../../components/filter/Filter";

// OTHERS
import styles from "./style.module.scss";

function ProductsScreen() {
  return (
    <section className={styles.container}>
      <Filter />
    </section>
  );
}

export default ProductsScreen;
