"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type AldeasCaserios2018 = {
  ID_Departamento2018: number
  ID_Municipio2018: number
  Municipio2018: string
  Aldea2018: string
  Caserio2018: string
  Total2018: string
}

export type AldeasCaserios2002 = {
  ID_Departamento2002: number
  ID_Municipio2002: number
  Municipio2002: string
  Aldea2002: string
  Caserio2002: string
  Total2002: string
}

export type TotalesCombinados = {
  ID_Departamento: number
  ID_Municipio: number
  Municipio: string
  Total2002: string
  Total2018: string
}

export const columnsAldeasCaserios2018: ColumnDef<AldeasCaserios2018>[] = [
  {
    accessorKey: "ID_Departamento2018",
    meta: "ID Departamento 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Departamento 2018" />
    ),
  },
  {
    accessorKey: "ID_Municipio2018",
    meta: "ID Municipio 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Municipio 2018" />
    ),
  },
  {
    accessorKey: "Municipio2018",
    meta: "Municipio 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio 2018" />
    ),
  },
  {
    accessorKey: "Aldea2018",
    meta: "Aldeas 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Aldeas 2018" />
    ),
  },
  {
    accessorKey: "Caserio2018",
    meta: "Caserios 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Caserios 2018" />
    ),
  },
  {
    accessorKey: "Total2018",
    meta: "Total 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total 2018" />
    ),
  },
]

export const columnsAldeasCaserios2002: ColumnDef<AldeasCaserios2002>[] = [
  {
    accessorKey: "ID_Departamento2002",
    meta: "ID Departamento 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Departamento 2002" />
    ),
  },
  {
    accessorKey: "ID_Municipio2002",
    meta: "ID Municipio 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Municipio 2002" />
    ),
  },
  {
    accessorKey: "Municipio2002",
    meta: "Municipio 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio 2002" />
    ),
  },
  {
    accessorKey: "Aldea2002",
    meta: "Aldeas 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Aldeas 2002" />
    ),
  },
  {
    accessorKey: "Caserio2002",
    meta: "Caserios 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Caserios 2002" />
    ),
  },
  {
    accessorKey: "Total2002",
    meta: "Total 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total 2002" />
    ),
  },
]

export const columnsTotalesCombinados: ColumnDef<TotalesCombinados>[] = [
  {
    accessorKey: "ID_Departamento",
    meta: "ID Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Departamento" />
    ),
  },
  {
    accessorKey: "ID_Municipio",
    meta: "ID Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Municipio" />
    ),
  },
  {
    accessorKey: "Municipio",
    meta: "Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "Total2002",
    meta: "Total 2002",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total 2002" />
    ),
  },
  {
    accessorKey: "Total2018",
    meta: "Total 2018",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total 2018" />
    ),
  },
]
