// code copied from global filter
// changes made are denoted by //coloumn filter

import React from "react";

//coloumn filter
export const ColumnFilter = ({ column }) => {
  //coloumn filter
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search:{" "}
      <input
        //coloumn filter
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
    </span>
  );
};
