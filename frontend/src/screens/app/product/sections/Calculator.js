// OTHERS
import { useState } from "react";
import styles from "./scss/calculator.module.scss";

function Calculator() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(0);
  return (
    <section className={styles.container}>
     {open ? <button className={styles.btn} onClick={() => setOpen(!open)}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" ><path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg></button> :<h1 onClick={() => setOpen(!open)}>
        გაიგე მარტივად რა რაოდენობის გჭირდება
      </h1>}
      {open && (
        <div className={styles.table}>
      
          <div className={styles.inner}>    <p>შეიყვანეთ დასაფარი ფართი: </p>
          <div className={styles.hell}>  <input
              type="number"
              min={0}
              pattern="[0-9]*"
                            onChange={(e) => setAnswer(e.target.value >0 ? e.target.value : 0)}
            />
            <p className={styles.m2}>
              მ<sup>2</sup>
            </p></div>
          
          </div>
          <p>თქვენ დაგჭირდებათ {((answer / 18) * 2).toFixed(1)} ლიტრი</p>
          <p className={styles.error}>(დათვლილია ორ ფენაზე)</p>
        </div>
      )}
    </section>
  );
}

export default Calculator;
