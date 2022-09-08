// REACT
import React, { useEffect } from "react";
import Select from "react-select";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/actions/systemActions";

// OTHERS
import "./search.css";


function Search(props) {
  // HOOKS
  const dispatch = useDispatch();

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="ძიება..."
        value={props.word}
        onChange={(e) => props.WordSetter(e.target.value)}
      />
      {categories && (
   
          <Select
            options={categories}
            isClearable={true}
            placeholder="კატეგორია"
           className="search-category"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option._id}
            onChange={(option) => props.CategorySetter(option)}
          />
    
      )}
      <div className="search-icon-container">
        {" "}
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
