// create the headings for the columns  : Header: 'Id',
// then assigning the heading to the actual names in the data so as to populate the coloumn data : accessor: 'id'
// footer is used when pagination is not used to replicate the heading row of the cooumn at the bottom

import { ColumnFilter } from "./ColumnFilter";
// to group multiple headers into one
export const GROUPED_COLOMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "Full Name",
    Footer: "Full Name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
        Filter: ColumnFilter,
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
        Filter: ColumnFilter,
      },
    ],
  },
];
export const COLOMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    // Filter: ColumnFilter,
    disableFilters: true,
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    // Filter: ColumnFilter
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    // Filter: ColumnFilter
  },
];
