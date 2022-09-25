import { useState } from "react";

function Color({ styles, src, id, Changer, color }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.color}
      onClick={() => {
        Changer(id);
      }}
    >
      <img
        src={src}
        className={styles.thumbnail}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={color == id ? { border: "3px solid  var(--color-second)" } : {}}
      />
      {hover && <img src={src} className={styles.img} />}
    </div>
  );
}

export default Color;
