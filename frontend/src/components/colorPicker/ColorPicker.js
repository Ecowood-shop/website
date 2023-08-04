import Color from "./color/Color";

// OTHERS
import styles from "./colorPicker.module.scss";

function ColorPicker({ variants, Changer, color }) {
  return (
    <section className={styles.container}>
      {variants.map((element) => (
        <Color
          Changer={(name) => Changer(name)}
          element={element}
          key={element.id}
          color={color}
          picker
        />
      ))}
    </section>
  );
}

export default ColorPicker;
