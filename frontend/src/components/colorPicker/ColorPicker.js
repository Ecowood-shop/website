import Color from "./color/Color";

// OTHERS
import styles from "./colorPicker.module.scss";
import image from "./a.png";
import image2 from "./b.png";

function ColorPicker({ Changer, color }) {
  const colors = [
    { id: 4 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
  ];
  return (
    <section className={styles.container}>
      {colors.map((element) => (
        <Color
          src={image}
          Changer={(id) => Changer(id)}
          id={element.id}
          key={element.id}
          color={color}
          picker
        />
      ))}
    </section>
  );
}

export default ColorPicker;
