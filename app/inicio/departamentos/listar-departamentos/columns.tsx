"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type Departamento = {
  id: string
  nombre: string
}

export const columns: ColumnDef<Departamento>[] = [
  {
    accessorKey: "id",
    meta: "ID",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "nombre",
    meta: "Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
]
