// REACT
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Select from "react-select";

//  REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions/systemActions";

// COMPONENTS
import FilterPanel from "./FilterPanel";

// OTHERS
import styles from "./filter.module.scss";
import logo from "../../static/images/altax.png";

function Filter() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const priceOptions = [
    { value: "1", label: "ზრდადობით" },
    { value: "-1", label: "კლებადობით" },
  ];
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const toggle = (container, containerResponsive) => {
    const filter = document.getElementById("filter");
    if (filter) {
      filter.className === container + " w3-animate-right"
        ? (filter.className += " " + containerResponsive)
        : (filter.className = container + " w3-animate-right");
    }
  };

  const Navigator = () => {
    navigate({
      search: `?${createSearchParams(
        Object.assign(
          {},
          category && { category: category.name },
          word && { word: word },
          priceOrder && { orderby: priceOrder.value }
        )
      )}`,
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
        <button className={styles.button} onClick={() => Navigator()}>
          გაფილტვრა
        </button>
      </div>
    </header>
  );
}

export default Filter;
