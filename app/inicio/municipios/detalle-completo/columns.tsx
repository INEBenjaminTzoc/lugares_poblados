"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type DetalleTodasCategorias = {
  Codigo_Depto2018: number
  Codigo_Mupio2018: number
  Mupio2018: string
  a1: number
  a2: number
  a3: number
  a4: number
  Y: number
  T: number
  a6: number
  a7: number
  Total2018: number
}

export const columns: ColumnDef<DetalleTodasCategorias>[] = [
  {
    accessorKey: "Codigo_Depto2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "Codigo_Mupio2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código Municipio" />
    ),
  },
  {
    accessorKey: "Mupio2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "a1",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="1" />
    ),
  },
  {
    accessorKey: "a2",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="2" />
    ),
  },
  {
    accessorKey: "a3",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="3" />
    ),
  },
  {
    accessorKey: "a4",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="4" />
    ),
  },
  {
    accessorKey: "Y",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="5Y" />
    ),
  },
  {
    accessorKey: "T",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="5T" />
    ),
  },
  {
    accessorKey: "a6",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="6" />
    ),
  },
  {
    accessorKey: "a7",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="7" />
    ),
  },
  {
    accessorKey: "Total2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total2018" />
    ),
  },
]
