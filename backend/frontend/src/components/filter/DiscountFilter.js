// REACT
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

// COMPONENTS
import FilterPanel from "./FilterPanel";

// translate
import { useTranslation } from "react-i18next";

function DiscountFilter() {
  const [word, setWord] = useState("");
  const { t } = useTranslation(["components"]);
  // HOOKS
  const navigate = useNavigate();

  const toggle = (container, containerResponsive) => {
    const filter = document.getElementById("filter");
    filter.className === container + " w3-animate-right"
      ? (filter.className += " " + containerResponsive)
      : (filter.className = container + " w3-animate-right");
  };

  const Navigator = () => {
    navigate({
      search: `?${createSearchParams(
        Object.assign({}, word && { word: word })
      )}`,
    });
  };
  return (
    <header
      id="filter"
      className={
        styles.container + " w3-animate-right " + styles.discountFilter
      }
    >
      <FilterPanel
        t={t}
        styles={styles}
        toggle={(class1, class2) => toggle(class1, class2)}
      />

      <img
        src={logo}
        alt="alta logo"
        className={styles.logo}
        onClick={() => navigate("/")}
      />
      <input
        type="text"
        className={styles.input + " " + styles.min}
        placeholder={t("global.search") + "..."}
        onChange={(e) => setWord(e.target.value)}
      />

      <div className={styles.inputContainer}>
        <button className={styles.button} onClick={() => Navigator()}>
          {t("global.filter")}
        </button>
      </div>
    </header>
  );
}
export default DiscountFilter;
