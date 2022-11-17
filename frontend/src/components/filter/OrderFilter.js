// REACT
import { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Select from "react-select";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

// COMPONENTS
import FilterPanel from "./FilterPanel";

function OrderFilter() {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState("");

  // HOOKS
  const navigate = useNavigate();

  const adminOptions = [
    { value: "0", label: "მომხმარებელი" },
    { value: "1", label: "ადმინი" },
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
          status && { status: status.value },
          id && { id:id }
        )
      )}`,
    });
  };
  return (
    <header id="filter" className={styles.container + " w3-animate-right"}>
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
        placeholder="მომხმარებელი..."
        onChange={(e) => setWord(e.target.value)}
      /> 
        <input
        type="number"
        className={styles.input +" "+styles.id}
        placeholder="აიდი..."
        onChange={(e) => setId(e.target.value)}
      />
      <div className={styles.inputContainer}>
        <Select
          options={adminOptions}
          isClearable={true}
          placeholder="სტატუსი"
          onChange={(option) => setStatus(option)}
          className={styles.select}
        />
        <button className={styles.button} onClick={() => Navigator()}>
          გაფილტვრა
        </button>
      </div>
    </header>
  );
}
export default OrderFilter;
