// REACT
import React from "react";

// OTHERS
import "./search.css";


// MATERIAL MUI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function Search() {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }]

  return (
    <div className="search-container">
      <input type="text" placeholder="ძიება..." />
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      className="search-category"
      renderInput={(params) => <TextField {...params} label="კატეგორია" className="search-category-field"/>}
    />
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
