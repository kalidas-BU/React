// code copied from the BasicTable.js then implemented another features to malke Filtering posssible on the table
// the changes made are highlighted by //filter
import React, { useMemo } from "react";
//filter
// import { useTable, useGlobalFilter } from "react-table";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  defaultColumn,
} from "react-table";
import MockData from "./data.json";
// import { COLOMNS, GROUPED_COLOMNS } from "./coloumns";
import { COLOMNS } from "./coloumns";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";

//filter
export const FilteringTable = () => {
  // useMemo(() => function, input)
  // useMemo hook/function is used so data is not created on every render
  // If not used ract will think the data is comming on every render and will calculate lots of unnessesory data
  const columns = useMemo(() => COLOMNS, []);
  // const columns = useMemo(() => GROUPED_COLOMNS, []);
  const data = useMemo(() => MockData, []);
  // Filter
  // this defaultColumn is used to add fiter to every coloumn so we dont have to write explicitly there in coloumn file
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  // useTable will return Table instance
  const tableInstance = useTable(
    {
      // without useMemo hook
      // columns: COLOMNS,
      // data: MockData

      // with useMemo hook
      columns: columns,
      data: data,
      defaultColumn: defaultColumn,
    },
    //filter
    useFilters,
    useGlobalFilter
  );

  // functions and arrays available/given by useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    //filter state of the table
    state,
    //filter set the global filter value
    setGlobalFilter,
  } = tableInstance;

  //filter
  // state contains many properties
  const { globalFilter } = state;
  // {
  // getTableProps => headerGroups => getHeaderGroupProps() => getHeaderProps() => Header
  // getTableBodyProps => rows => prepareRow(row) => getRowProps() => getCellProps() => Cell

  /* headerGroups.map this gives access to individual header group */
  // headerGroups gives us access to this GROUPED_COLOMNS
  // }
  return (
    //filter
    // add react fragment
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((colomn) => (
                <th {...colomn.getHeaderProps()}>
                  {colomn.render("Header")}
                  <span>
                    {colomn.canFilter ? colomn.render("Filter") : null}
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
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
    </>
  );
};

// see when to use
// map(()=>{})
// map(()=>())
