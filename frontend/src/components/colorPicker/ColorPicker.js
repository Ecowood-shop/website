import Color from "./color/Color";

// OTHERS
import styles from "./colorPicker.module.scss";

function ColorPicker(props) {
  return (
    <section className={styles.container}>
      {props.variants.map((element) => (
        <Color
          Changer={(name) => props.Changer(name)}
          Nuller={props.Nuller}
          element={element}
          key={element.id}
          color={props.color}
          picker
        />
      ))}
    </section>
  );
}

export default ColorPicker;
