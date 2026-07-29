"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Settings2,
  Search,
} from "lucide-react";

export interface DataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  searchable?: boolean;
  searchColumn?: string;
  searchPlaceholder?: string;
  selectable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  className?: string;
  onRowClick?: (row: TData) => void;
  onSelectionChange?: (rows: TData[]) => void;
  emptyMessage?: string;
  loading?: boolean;
  toolbar?: React.ReactNode;
  columnToggle?: boolean;
}

function DataGrid<TData>({
  data,
  columns,
  searchable = false,
  searchColumn,
  searchPlaceholder = "Search...",
  selectable = false,
  paginated = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  striped = false,
  bordered = false,
  compact = false,
  stickyHeader = false,
  className,
  onRowClick,
  onSelectionChange,
  emptyMessage = "No results.",
  loading = false,
  toolbar,
  columnToggle = false,
}: DataGridProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [showColumnToggle, setShowColumnToggle] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: selectable,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: { pageSize },
    },
  });

  React.useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((r) => r.original);
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, table, onSelectionChange]);

  return (
    <div className={cn("space-y-4", className)}>
      {(searchable || toolbar || columnToggle) && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            {searchable && (
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder={searchPlaceholder}
                  value={searchColumn ? (table.getColumn(searchColumn)?.getFilterValue() as string) ?? "" : globalFilter}
                  onChange={(e) => {
                    if (searchColumn) {
                      table.getColumn(searchColumn)?.setFilterValue(e.target.value);
                    } else {
                      setGlobalFilter(e.target.value);
                    }
                  }}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent pl-8 pr-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            )}
            {toolbar}
          </div>
          {columnToggle && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColumnToggle(!showColumnToggle)}
                className="flex items-center gap-2 rounded-md border px-3 h-9 text-sm hover:bg-accent"
              >
                <Settings2 className="h-4 w-4" /> Columns
              </button>
              {showColumnToggle && (
                <div className="absolute right-0 top-full mt-1 z-50 min-w-[150px] rounded-md border bg-popover p-2 shadow-md">
                  {table.getAllLeafColumns().map((col) => (
                    <label
                      key={col.id}
                      className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={col.getIsVisible()}
                        onChange={col.getToggleVisibilityHandler()}
                        className="h-4 w-4 rounded border-input"
                      />
                      {typeof col.columnDef.header === "string"
                        ? col.columnDef.header
                        : col.id}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={cn("rounded-md border", stickyHeader && "max-h-[600px] overflow-auto")}>
        <table className="w-full caption-bottom text-sm">
          <thead className={cn("[&_tr]:border-b", stickyHeader && "sticky top-0 bg-background z-10")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b transition-colors">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      "h-10 px-2 text-left align-middle font-medium text-muted-foreground",
                      compact && "h-8 px-2 text-xs",
                      bordered && "border-r last:border-r-0",
                      header.column.getCanSort() && "cursor-pointer select-none"
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-3.5 w-3.5" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="h-3.5 w-3.5" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-30" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    row.getIsSelected() && "bg-muted",
                    striped && idx % 2 === 1 && "bg-muted/30",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "p-2 align-middle",
                        compact && "py-1 px-2 text-xs",
                        bordered && "border-r last:border-r-0"
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginated && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {selectable && (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>Rows per page</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="h-8 rounded-md border border-input bg-transparent px-2 text-sm"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-accent disabled:opacity-50"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-accent disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-accent disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="h-8 w-8 rounded-md border flex items-center justify-center hover:bg-accent disabled:opacity-50"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { DataGrid };
