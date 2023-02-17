// components
import Section from "./section/Section";
// data
import { altax, express, Text } from "./data/data";
// styles
import styles from "./styles/styles.module.scss";

function About() {
  return (
    <article className={styles.container + " w3-animate-right"}>
      <header>
        <h1>ჩვენს შესახებ</h1>
      </header>
      <img src="https://ecowood.ge/wp-content/uploads/2021/02/fb-offer.jpg" />
      <Text />
      <h1>ფილიალები</h1>
      <Section styles={styles} company={altax} />
      <Section styles={styles} company={express} />
    </article>
  );
}

export default About;
