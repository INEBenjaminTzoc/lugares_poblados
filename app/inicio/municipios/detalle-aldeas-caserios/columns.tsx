"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type DetalleAldeaCaserio = {
  Depto2022:   string
  IDMupio2022: number
  Mupio2022: string
  ALDEA2022: number
  CASERIO2022: number
  A1: number
  C1: number
  A2: number
  C2: number
  A3: number
  C3: number
  A4: number
  C4: number
  A5Y: number
  C5Y: number
  A5T: number
  C5T: number
  A6: number
  C6: number
  A7: number
  C7: number
  A8: number
  C8: number
  A9: number
  C9: number
  Total2022: number
}

export const columns: ColumnDef<DetalleAldeaCaserio>[] = [
  {
    accessorKey: "Depto2022",
    meta: "Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "IDMupio2022",
    meta: "Código Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código Municipio" />
    ),
  },
  {
    accessorKey: "Mupio2022",
    meta: "Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "ALDEA2022",
    meta: "ALDEA2023",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ALDEA2023" />
    ),
  },
  {
    accessorKey: "CASERIO2022",
    meta: "CASERIO2023",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="CASERIO2023" />
    ),
  },
  {
    accessorKey: "A1",
    meta: "A1",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A1" />
    ),
  },
  {
    accessorKey: "C1",
    meta: "C1",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C1" />
    ),
  },
  {
    accessorKey: "A2",
    meta: "A2",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A2" />
    ),
  },
  {
    accessorKey: "C2",
    meta: "C2",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C2" />
    ),
  },
  {
    accessorKey: "A3",
    meta: "A3",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A3" />
    ),
  },
  {
    accessorKey: "C3",
    meta: "C3",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C3" />
    ),
  },
  {
    accessorKey: "A4",
    meta: "A4",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A4" />
    ),
  },
  {
    accessorKey: "C4",
    meta: "C4",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C4" />
    ),
  },
  {
    accessorKey: "A5Y",
    meta: "A5Y",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A5Y" />
    ),
  },
  {
    accessorKey: "C5Y",
    meta: "C5Y",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C5Y" />
    ),
  },
  {
    accessorKey: "A5T",
    meta: "A5T",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A5T" />
    ),
  },
  {
    accessorKey: "C5T",
    meta: "C5T",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C5T" />
    ),
  },
  {
    accessorKey: "A6",
    meta: "A6",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A6" />
    ),
  },
  {
    accessorKey: "C6",
    meta: "C6",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C6" />
    ),
  },
  {
    accessorKey: "A7",
    meta: "A7",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A7" />
    ),
  },
  {
    accessorKey: "C7",
    meta: "C7",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C7" />
    ),
  },
  {
    accessorKey: "A8",
    meta: "A8",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A8" />
    ),
  },
  {
    accessorKey: "C8",
    meta: "C8",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C8" />
    ),
  },
  {
    accessorKey: "A9",
    meta: "A9",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="A9" />
    ),
  },
  {
    accessorKey: "C9",
    meta: "C9",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="C9" />
    ),
  },
  {
    accessorKey: "Total2022",
    meta: "Total2023",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total2023" />
    ),
  },
]
