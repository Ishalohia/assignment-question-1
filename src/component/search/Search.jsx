import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search by Order ID"
    />
  );
};

export default Search;
