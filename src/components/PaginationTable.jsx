import "./table.css";
import { GROUPED_COLUMNS } from "./columns";
import { useTable, usePagination } from "react-table";
import { useMemo } from "react";
import MOCK_DATA from "../../data/MOCK_DATA.json";

export const PaginationTable = () => {
  const data = useMemo(() => MOCK_DATA, []);
  const columns = useMemo(() => GROUPED_COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    previousPage,
    nextPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
    state,
  } = useTable({ columns, data, initialState: { pageIndex: 2, pageSize: 10 } }, usePagination);

  const { pageIndex, pageSize } = state;

  return (
    <>
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
          {page.map((row) => {
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
      </table>
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{' '}
        </span>
        <span>
          Page Size:
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>{pageSize}</option>
            ))}
          </select>
        </span>
        <span>
          Go to page:
          <input type="number" defaultValue={pageIndex + 1} onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }} style={{ width: '100px' }} />
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>First</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last</button>
      </div>
    </>
  );
};
