//REACT
import React from "react";

// OTHERS
import styles from "./popup.module.scss";

// translate
import { useTranslation } from "react-i18next";

function Popup({ text, popper, Delete }) {
  const { t } = useTranslation(["components"]);
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
          <button onClick={() => clicker("success")}> {t("popup.yes")}</button>
          <button onClick={() => clicker()}> {t("popup.no")}</button>
        </div>
      </section>
    </div>
  );
}

export default Popup;
