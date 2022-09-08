// REACT
import React, { useEffect, useState } from "react";
import Select from "react-select";

//  REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/systemActions";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

function Filter() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");
  const [priceOrder, setPriceOrder] = useState("");

  const priceOptions = [
    { value: "-1", label: "ზრდადობით" },
    { value: "1", label: "კლებადობით" },
  ];
  // HOOKS
  const dispatch = useDispatch();

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const toggle = (container, containerResponsive) => {
    const filter = document.getElementById("filter");
    filter.className === container + " w3-animate-right"
      ? (filter.className += " " + containerResponsive)
      : (filter.className = container + " w3-animate-right");
  };

  function FilterPanel() {
    return (
      <section className={styles.toggle}>
        <img src={logo} alt="alta logo" className={styles.logo} />{" "}
        <button
          onClick={() => toggle(styles.container, styles.containerResponsive)}
        >
          ფილტრი{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className={styles.icon}
          >
            <path d="M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z" />
          </svg>
        </button>
      </section>
    );
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <header id="filter" className={styles.container + " w3-animate-right"}>
      <FilterPanel />

      <img src={logo} alt="alta logo" className={styles.logo} />
      <input
        type="text"
        className={styles.input}
        placeholder="სახელწოდება..."
        onChange={(e) => setWord(e.target.value)}
      />
      <div className={styles.inputContainer}>
        <Select
          options={categories}
          isClearable={true}
          placeholder="კატეგორია"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
          className={styles.select}
          onChange={(option) => setCategory(option)}
        />
        <Select
          options={priceOptions}
          isClearable={true}
          placeholder="ფასი"
          onChange={(option) => setPriceOrder(option)}
          className={styles.select}
        />
        <button className={styles.button}>გაფილტვრა</button>
      </div>
    </header>
  );
}

export default Filter;
