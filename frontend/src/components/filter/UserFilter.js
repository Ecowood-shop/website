// REACT
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Select from "react-select";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

// COMPONENTS
import FilterPanel from "./FilterPanel";

// translate
import { useTranslation } from "react-i18next";

function UserFilter() {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("");

  // HOOKS
  const navigate = useNavigate();

  const { t } = useTranslation(["components"]);

  const adminOptions = [
    { value: "0", label: t("global.user") },
    { value: "1", label: t("global.admin") },
  ];

  const toggle = (container, containerResponsive) => {
    const filter = document.getElementById("filter");
    filter.className === container + " w3-animate-right"
      ? (filter.className += " " + containerResponsive)
      : (filter.className = container + " w3-animate-right");
  };

  const Navigator = () => {
    navigate({
      search: `?${createSearchParams(
        Object.assign(
          {},
          word && { word: word },
          status && { status: status.value }
        )
      )}`,
    });
  };
  return (
    <header id="filter" className={styles.container + " w3-animate-right"}>
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
        className={styles.input}
        placeholder={t("global.search") + "..."}
        onChange={(e) => setWord(e.target.value)}
      />
      <div className={styles.inputContainer}>
        <Select
          options={adminOptions}
          isClearable={true}
          placeholder={t("global.status")}
          onChange={(option) => setStatus(option)}
          className={styles.select}
        />
        <button className={styles.button} onClick={() => Navigator()}>
          {t("global.filter")}
        </button>
      </div>
    </header>
  );
}
export default UserFilter;
