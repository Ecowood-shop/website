//REACT
import React from "react";

// OTHERS
import styles from "./popup.module.scss";

function Popup({ text, popper, Delete }) {
  const clicker = (success) => {
    if (success) {
      Delete();
    }
    popper();
  };
  return (
    <div className={styles.container}>
      <section className={styles.popup}>
        <h1>{text}</h1>
        <div className={styles.btnContainer}>
          <button onClick={() => clicker("success")}>დიახ</button>
          <button onClick={() => clicker()}>არა</button>
        </div>
      </section>
    </div>
  );
}

export default Popup;
