import { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import axios from "axios";

export default function InventoryTable() {
  const [items, setItmes] = useState();
  const getData = async () => {
    const response = await axios.get("http://localhost:3001/items");
    setItmes(response.data);
  };
  useEffect(() => {
    getData();
  }, [items]);

  const data = useMemo(() => items, [items]) || [];

  const columns = useMemo(
    () => [
      {
        Header: "구매일",
        accessor: "buyDate", // accessor is the "key" in the data
      },
      {
        Header: "구매처",
        accessor: "buyPlace",
      },
      {
        Header: "사이즈",
        accessor: "size",
      },
      {
        Header: "제품명",
        accessor: "productName",
      },
      {
        Header: "수량",
        accessor: "quantity",
      },
      {
        Header: "구매금액",
        accessor: "price",
      },
      {
        Header: "원화구매금액",
        accessor: "krwPrice",
      },
      {
        Header: "배대지 비용",
        accessor: "shipExpense",
      },
      {
        Header: "관부가세",
        accessor: "customsDuty",
      },
      {
        Header: "총구매금액",
        accessor: "totalPrice",
      },
      {
        Header: "판매금액",
        accessor: "sellPrice",
      },
      {
        Header: "순이익",
        accessor: "netProfit",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      //@ts-ignore
      columns,
      data,
    });
  return (
    <table {...getTableProps()} className="">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className="whitespace-nowrap"
          >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className="text-start">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="whitespace-nowrap">
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="text-start ">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
