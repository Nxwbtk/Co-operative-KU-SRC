"use client";
import * as React from "react";

import { Table } from "@tanstack/react-table";
import { LucideIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options.component";

import { DataTableFacetedFilter } from "./data-table-faceted-filter.component";
import { IToolbarOptions } from ".";

interface IStatue {
  value: string | number | boolean;
  label: string;
  icon: LucideIcon;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  statuses?: IStatue[];
  toolbarOptions?: IToolbarOptions;
}

export function DataTableToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table, statuses = [], toolbarOptions = {} } = props;
  const { createBtn } = toolbarOptions;
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder="ค้นหา"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => {
            table.setGlobalFilter(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="สถานะ"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.resetGlobalFilter();
            }}
            className="h-8 px-2 lg:px-3"
          >
            ล้าง
            <X className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <DataTableViewOptions table={table} />
        {createBtn ? createBtn() : null}
      </div>
    </div>
  );
}
