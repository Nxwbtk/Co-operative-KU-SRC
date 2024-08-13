"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination.component";
import { DataTableToolbar } from "./data-table-toolbar.component";
import { FileIcon, LucideIcon } from "lucide-react";
import { cx } from "class-variance-authority";

export type IStatus = {
  label: string;
  value: any;
  icon: LucideIcon;
};

export type INavigationOptions = {
  pagination?: boolean;
};

export type IToolbarOptions = {
  createBtn?: () => JSX.Element | null;
};

/**
 * IOptions
 *
 * @description The options for the DataTable component.
 * @param {boolean} toolbar - Whether or not to show the toolbar. default = true
 * @param {boolean} navigation - Whether or not to show the navigation. default = true
 * @usage true = show | false = hide
 */
type IOptions = {
  toolbar?: boolean;
  navigation?: boolean;
  selectable?: boolean;
  toolbarOptions?: IToolbarOptions;
  navigationOptions?: INavigationOptions;
};

/**
 * IStatuses
 *
 * @description The props for the DataTable component.
 * @param {string | number | boolean} value
 * @param {string} label
 * @param {LucideIcon} icon
 */

export type IStatuses = {
  value: string | number | boolean;
  label: string;
  icon: LucideIcon;
};

/**
 * IDataTableProps
 *
 * @description The props for the DataTable component.
 * @param {ColumnDef<TData, TValue>[]} columns
 * @param {TData[]} data
 * @param {IOptions} options
 */
export interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  options: IOptions;
  name: string;
  statuses?: IStatus[];
  isEmptyText?: string;
  isEmptyElement?: React.ReactNode;
}

/**
 * DataTable
 *
 * @description A data table component that uses the react-table library with a custom UI made with Tailwind CSS.
 * @param {ColumnDef<TData. TValue>} columns
 * @param {TData[]} data
 * @param {IOptions} options
 * @param {typeof statuses} statuses
 *
 * @returns {JSX.Element}
 * @see https://github.com/shadcn/ui/tree/main/apps/www/app/examples/tasks
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  options,
  name,
  statuses = [],
  isEmptyText,
  isEmptyElement,
}: IDataTableProps<TData, TValue>): React.JSX.Element {
  const {
    toolbar = true,
    toolbarOptions = undefined,
    navigation = true,
    selectable = false,
    navigationOptions = undefined,
  } = options;

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter: globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      {!toolbar ? null : (
        <DataTableToolbar
          table={table}
          statuses={statuses}
          toolbarOptions={toolbarOptions}
        />
      )}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.headerClassName}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody id={`${name}-datatable`}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  id={`${row.id}-${name}-row`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      id={`${cell.id}-${name}-cell`}
                      className={cell.column.columnDef.meta?.cellClassName}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="w-full h-56 text-center text-zinc-500"
                >
                  <div
                    className={cx({
                      "flex flex-col gap-y-2": isEmptyElement,
                    })}
                  >
                    <div className="flex flex-col gap-y-2">
                      <FileIcon
                        size={56}
                        strokeWidth={0.5}
                        color="#71717a"
                        className="mx-auto"
                      />
                      <span className="text-sm">
                        {isEmptyText ?? "ไม่มีข้อมูลในตาราง"}
                      </span>
                    </div>

                    {isEmptyElement ?? <></>}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {!navigation ? null : (
          <div className="py-2.5 px-5 border-t border-t-gray-200">
            <DataTablePagination
              table={table}
              selectable={selectable}
              navigationOptions={navigationOptions}
            />
          </div>
        )}
      </div>
    </div>
  );
}
