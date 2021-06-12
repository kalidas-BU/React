// code copied from the BasicTable.js then implemented another features to malke sorting posssible on the table
// the changes made are highlighted by //sort
import React, { useMemo } from "react";
//sort
import { useTable, useSortBy } from "react-table";
import MockData from "./data.json";
import { COLOMNS, GROUPED_COLOMNS } from "./coloumns";
import "./table.css";

//sort
export const SortingTable = () => {
  // useMemo(() => function, input)
  // useMemo hook/function is used so data is not created on every render
  // If not used ract will think the data is comming on every render and will calculate lots of unnessesory data
  // const columns = useMemo(() => COLOMNS, []);
  const columns = useMemo(() => GROUPED_COLOMNS, []);
  const data = useMemo(() => MockData, []);

  // useTable will return Table instance
  const tableInstance = useTable(
    {
      // without useMemo hook
      // columns: COLOMNS,
      // data: MockData

      // with useMemo hook
      columns: columns,
      data: data,
    },
    //sort
    useSortBy
  );

  // functions and arrays available/given by useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  // {
  // getTableProps => headerGroups => getHeaderGroupProps() => getHeaderProps() => Header
  // getTableBodyProps => rows => prepareRow(row) => getRowProps() => getCellProps() => Cell

  /* headerGroups.map this gives access to individual header group */
  // headerGroups gives us access to this GROUPED_COLOMNS
  // }
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((colomn) => (
              <th {...colomn.getHeaderProps(colomn.getSortByToggleProps())}>
                {colomn.render("Header")}
                {/* //sort colomn.getSortByToggleProps() this is also called above in getHeaderProps 
              and below span is used */}
                <span>
                  {colomn.isSorted ? (colomn.isSortedDesc ? "%" : "^") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

// see when to use
// map(()=>{})
// map(()=>())
