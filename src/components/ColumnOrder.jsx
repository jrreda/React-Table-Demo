import "./table.css";
import { GROUPED_COLUMNS } from "./columns";
import { useTable, useColumnOrder } from "react-table";
import { useMemo } from "react";
import MOCK_DATA from "../../data/MOCK_DATA.json";

export const ColumnOrderTable = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => GROUPED_COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    setColumnOrder,
  } = useTable({ columns, data }, useColumnOrder);

  const changeColumnOrder = () => {
    setColumnOrder(['id', 'first_name', 'last_name', 'country', 'phone', 'email', 'date_of_birth']);
  }

  return (
    <>
    <button onClick={changeColumnOrder}>Change Column Order</button>

    <table>
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        {footerGroups.map((footerGroup) => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {footerGroup.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
    </>
  );
};
