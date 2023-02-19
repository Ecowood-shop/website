// REACT
import { useState } from "react";

// OTHERS
import styles from "./color.module.scss";

function Color(props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.color}
      onClick={() => {
        if (props.picker) {
          props.Changer(props.element);
        }
      }}
    >
      <img
        src={props.element.image}
        className={styles.thumbnail}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={
          props.element?.id == props.color?.id && props.picker
            ? { border: "3px solid  var(--color-second)" }
            : {}
        }
      />
      {hover && (
        <div className={styles.holder}>
          <img src={props.element.image} className={styles.img} />{" "}
          <p className={styles.imgText}>{props.element.color}</p>
        </div>
      )}
    </div>
  );
}

export default Color;
