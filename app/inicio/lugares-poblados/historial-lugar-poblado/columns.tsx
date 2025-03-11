"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type LugaresPobladosHistorial = {
  ID_LugarPoblado: number
  LugarPoblado: string
  ID_Departamento: number
  Departamento: string
  ID_Municipio: number
  Municipio: string
  Categoria: string
  Estado: string
  Observacion: string
  EstadoMunicipio: string
  Pertenencia: string
}

export const columns: ColumnDef<LugaresPobladosHistorial>[] = [
  {
    accessorKey: "Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "ID_Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID Municipio" />
    ),
  },
  {
    accessorKey: "Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "LugarPoblado",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lugar Poblado" />
    ),
  },
  {
    accessorKey: "Categoria",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categoría" />
    ),
  },
  {
    accessorKey: "Estado",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
    ),
  },
  {
    accessorKey: "Observacion",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Observación" />
    ),
  },
  {
    accessorKey: "EstadoMunicipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado Municipio" />
    ),
  },
]
