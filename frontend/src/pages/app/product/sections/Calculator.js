// OTHERS
import { useState } from "react";
import styles from "./scss/calculator.module.scss";

function Calculator({ coverageLength, t }) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(0);
  return (
    <section className={styles.container}>
      {open ? (
        <button className={styles.btn} onClick={() => setOpen(!open)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
          </svg>
        </button>
      ) : (
        <h1 onClick={() => setOpen(!open)}>
          {t("product.find out easily how much you need")}
        </h1>
      )}
      {open && (
        <div className={styles.table}>
          <div className={styles.inner}>
            <p> {t("product.enter the coverage area")}: </p>
            <div className={styles.hell}>
              <input
                type="number"
                min={0}
                pattern="[0-9]*"
                defaultValue={0}
                onChange={(e) =>
                  setAnswer(e.target.value > 0 ? e.target.value : 0)
                }
              />
              <p className={styles.m2}>
                {t("product.meter")}
                <sup>2</sup>
              </p>
            </div>
          </div>
          <p>
            {t("product.you will need")}{" "}
            {((answer / coverageLength) * 2).toFixed(1)} {t("product.liter")}
          </p>
          <p className={styles.error}>
            ({t("product.counted for two layers")})
          </p>
        </div>
      )}
    </section>
  );
}

export default Calculator;
