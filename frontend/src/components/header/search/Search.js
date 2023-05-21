// REACT
import { useEffect, useState } from "react";
import Select from "react-select";
import { createSearchParams } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/actions/systemActions";

// OTHERS
import "./search.css";

function Search(props) {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState();

  // HOOKS
  const dispatch = useDispatch();

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const Navigator = () => {
    props.navigate({
      pathname: "products/search",
      search: `?${createSearchParams(
        Object.assign(
          {},
          category && { category: category.name },
          word && { word: word }
        )
      )}`,
    });
  };
  useEffect(() => {
    dispatch(getCategories(props.i18n.language));
  }, [dispatch, props.i18n.language]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={props.t("header.search") + "..."}
        value={props.word}
        onChange={(e) => setWord(e.target.value)}
      />
      {categories && (
        <Select
          options={categories}
          isClearable={true}
          placeholder={props.t("global.category")}
          className="search-category"
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option._id}
          onChange={(option) => setCategory(option)}
        />
      )}
      <div className="search-icon-container" onClick={() => Navigator()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="search-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Search;
