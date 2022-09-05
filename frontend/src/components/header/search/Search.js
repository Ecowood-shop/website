// REACT
import React, { useEffect, useState } from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/actions/systemActions";

// OTHERS
import "./search.css";

// MATERIAL MUI
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Search(props) {
  // HOOKS
  const dispatch = useDispatch();

  const systemCategories = useSelector((state) => state.systemCategories);
  const {categories } = systemCategories;

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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          inputValue={props.category?.name}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          getOptionLabel={(option) => option.name || ""}
          onInputChange={(_event, category) => {
            props.CategorySetter(category);
          }}
          sx={{ width: 300 }}
          className="search-category"
          renderInput={(params) => (
            <TextField
              {...params}
              label="კატეგორია"
              className="search-category-field"
            />
          )}
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
