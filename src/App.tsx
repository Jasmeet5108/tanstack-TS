import React, { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table'
import mData from "./data.json";

// Define the type for your data
interface Data {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  city: string;
}

const BasicTable: React.FC = () => {
  const data = useMemo<Data[]>(() => mData, []);

  const columns: ColumnDef<Data>[] = [
    {
      header: "ID",
      accessorKey: "id"
    },
    {
      header: "Name",
      accessorFn: row => `${row.first_name} ${row.last_name}`
    },
    {
      header: "Email ID",
      accessorKey: "email"
    },
    {
      header: "Gender",
      accessorKey: "gender"
    },
    {
      header: "City",
      accessorKey: "city"
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<Data>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting
    },
    onSortingChange: setSorting
  });

  return (
    <>
      <div>
        <table>
          <thead>
            {
              table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {
                    headerGroup.headers.map(header => (
                      <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {
                          flexRender(header.column.columnDef.header, header.getContext())
                        }
                        {
                          header.column.getIsSorted() === 'asc' ? ' asc' : header.column.getIsSorted() === 'desc' ? ' desc' : null
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody>
            {
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BasicTable;
