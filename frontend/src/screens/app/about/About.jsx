// components
import Section from "./section/Section";
// data
import { altax, express } from "./data/data";
// styles
import styles from "./styles/styles.module.scss";
// translate
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation(["app"]);
  return (
    <article className={styles.container + " w3-animate-right"}>
      <header>
        <h1>{t("about.header")}</h1>
      </header>
      <img
        src="https://ecowood.ge/wp-content/uploads/2021/02/fb-offer.jpg"
        alt="ecowood"
      />
      <p>{t("about.text")}</p>
      <h1>{t("about.branches")}</h1>
      <Section styles={styles} company={altax(t)} />
      <Section styles={styles} company={express(t)} />
    </article>
  );
}

export default About;
