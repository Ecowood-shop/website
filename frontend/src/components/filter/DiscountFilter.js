// REACT
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Select from "react-select";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

// COMPONENTS
import FilterPanel from "./FilterPanel";

function DiscountFilter() {
  const [word, setWord] = useState("");

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
        placeholder="keyword..."
        onChange={(e) => setWord(e.target.value)}
      />

      <div className={styles.inputContainer}>
        <button className={styles.button} onClick={() => Navigator()}>
          გაფილტვრა
        </button>
      </div>
    </header>
  );
}
export default DiscountFilter;
