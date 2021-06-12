// code copied from basic table.js file
// Remove footer groups and footer section
// chnages marked by // pagination
import React, { useMemo } from "react";
// pagination
import { useTable, usePagination } from "react-table";
import MockData from "./data.json";
import { COLOMNS, GROUPED_COLOMNS } from "./coloumns";
import "./table.css";

export const PaginationTable = () => {
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
    // pagination
    usePagination
  );

  // functions and arrays available/given by useTable hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    // pagination instead of destructuring rows we will get rows in page and will destructure it
    // rows,
    page,
    // pagination helper function provided by react-table to navigate through pagination
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    // pagination jump between pages
    gotoPage,
    pageCount,
    // pagination setting page size
    setPageSize,
    prepareRow,
  } = tableInstance;
  // pagination
  const { pageIndex, pageSize } = state;
  // {
  // getTableProps => headerGroups => getHeaderGroupProps() => getHeaderProps() => Header
  // getTableBodyProps => rows => prepareRow(row) => getRowProps() => getCellProps() => Cell

  /* headerGroups.map this gives access to individual header group */
  // headerGroups gives us access to this GROUPED_COLOMNS
  // }
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((colomn) => (
                <th {...colomn.getHeaderProps()}>{colomn.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {/* // pagination */}
          {page.map((row) => {
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
        {/* <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot> */}
      </table>
      {/* //pagination */}
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          GO to Page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
          ></input>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {/* jump page */}
        <button
          onClick={() => {
            gotoPage(0);
          }}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous button
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next button
        </button>
        <button
          onClick={() => {
            gotoPage(pageCount - 1);
          }}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

// see when to use
// map(()=>{})
// map(()=>())
