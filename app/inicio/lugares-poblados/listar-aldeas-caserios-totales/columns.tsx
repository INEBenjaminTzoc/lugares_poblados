"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type MostrarAldeasCaserios = {
  ID_Departamento: number
  Departamento: string
  ID_Municipio: number
  Municipio: string
  Aldeas?: number
  Caserios?: number
  Total?: number
}

const allColumns: ColumnDef<MostrarAldeasCaserios>[] = [
  {
    id: "ID_Departamento",
    accessorKey: "ID_Departamento",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID_Departamento" />,
  },
  {
    id: "Departamento",
    accessorKey: "Departamento",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Departamento" />,
  },
  {
    id: "ID_Municipio",
    accessorKey: "ID_Municipio",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID_Municipio" />,
  },
  {
    id: "Municipio",
    accessorKey: "Municipio",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Municipio" />,
  },
  {
    id: "Aldeas",
    accessorKey: "Aldeas",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aldeas" />,
  },
  {
    id: "Caserios",
    accessorKey: "Caserios",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Caserios" />,
  },
  {
    id: "Total",
    accessorKey: "Total",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
  },
]

export function generateColumns(data: MostrarAldeasCaserios[]): ColumnDef<MostrarAldeasCaserios>[] {
  const hasAldeas = data.some(item => item.Aldeas !== undefined)
  const hasCaserios = data.some(item => item.Caserios !== undefined)
  const hasTotal = data.some(item => item.Total !== undefined)

  return allColumns.filter(column => {
    if (column.id === "Aldeas" && !hasAldeas) return false
    if (column.id === "Caserios" && !hasCaserios) return false
    if (column.id === "Total" && !hasTotal) return false
    return true
  })
}