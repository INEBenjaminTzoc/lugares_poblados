"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { ColumnDef } from "@tanstack/react-table"

export type DetalleLugarPoblado = {
  Categoria:   string
  Departamento: string
  Estado: number
  EstadoMunicipio: string
  ID_Departamento: number
  ID_Lugar_Poblado: number
  ID_Municipio: number
  Municipio: string
  Nombre: string
  Observacion: string
  Pertenencia: string
}

export const columns: ColumnDef<DetalleLugarPoblado>[] = [
  {
    accessorKey: "Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "Pertenencia",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pertenencia" />
    ),
  },
  {
    accessorKey: "Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "Nombre",
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
