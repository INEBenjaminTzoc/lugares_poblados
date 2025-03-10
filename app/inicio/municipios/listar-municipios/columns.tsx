"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type Municipio = {
  departamento: string
  idMunicipio: number
  municipio: string
  estado: string
}

export const columns: ColumnDef<Municipio>[] = [
  {
    accessorKey: "departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "idMunicipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código Municipio" />
    ),
  },
  {
    accessorKey: "municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "estado",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
    ),
  },
]
