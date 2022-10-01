// REACT
import { useState } from "react";

// OTHERS
import styles from "./color.module.scss"

function Color(props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.color}
      onClick={() => {
        if (props.picker) {
          props.Changer(props.id);
        }
      }}
    >
      <img
        src={props.src}
        className={styles.thumbnail}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={
          props?.color == props?.id && props.picker
            ? { border: "3px solid  var(--color-second)" }
            : {}
        }
      />
      {hover && <img src={props.src} className={styles.img} />}
    </div>
  );
}

export default Color;
