// REACT
import React, { useEffect, useState } from "react";
import Select from "react-select";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

// COMPONENTS
import FilterPanel from "./FilterPanel";

function UserFilter() {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState("");

  const adminOptions = [
    { value: "-1", label: "მომხმარებელი" },
    { value: "1", label: "ადმინი" },
  ];

  const toggle = (container, containerResponsive) => {
    const filter = document.getElementById("filter");
    filter.className === container + " w3-animate-right"
      ? (filter.className += " " + containerResponsive)
      : (filter.className = container + " w3-animate-right");
  };

  return (
    <header id="filter" className={styles.container + " w3-animate-right"}>
      <FilterPanel
        styles={styles}
        toggle={(class1, class2) => toggle(class1, class2)}
      />

      <img src={logo} alt="alta logo" className={styles.logo} />
      <input
        type="text"
        className={styles.input}
        placeholder="სახელი..."
        onChange={(e) => setWord(e.target.value)}
      />
      <div className={styles.inputContainer}>
    
        <Select
          options={adminOptions}
          isClearable={true}
          placeholder="სტატუსი"
          onChange={(option) => setStatus(option)}
          className={styles.select}
        />
        <button className={styles.button}>გაფილტვრა</button>
      </div>
    </header>
  );
}
export default UserFilter;
