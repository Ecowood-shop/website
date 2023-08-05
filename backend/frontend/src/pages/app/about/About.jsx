import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  const branchesRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash === "#branches" && branchesRef.current) {
        branchesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [location]);

  
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
      <h1 id="branches" ref={branchesRef}>
        {t("about.branches")}
      </h1>
      <Section styles={styles} company={altax(t)} />
      <Section styles={styles} company={express(t)} />
    </article>
  );
}

export default About;
