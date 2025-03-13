"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Archive } from "lucide-react"

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

export type ArchivoLugarPoblado = {
  ID_LugarPoblado: number
  Lugar_Poblado: string
  ID_Departamento: number
  Departamento: string
  ID_Municipio: number
  Municipio: string
  ID_Archivo: number
  Tipo_Archivo: string
  Numero: string
  Fecha: string
  Observacion: string
}

export const columns = (handleVerArchivosClick: (idLugPob: number) => void): ColumnDef<DetalleLugarPoblado>[] => [
  {
    accessorKey: "Departamento",
    meta: "Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "Pertenencia",
    meta: "Pertenencia",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Pertenencia" />
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
    accessorKey: "Nombre",
    meta: "Lugar Poblado",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lugar Poblado" />
    ),
  },
  {
    accessorKey: "Categoria",
    meta: "Categoría",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categoría" />
    ),
  },
  {
    accessorKey: "Estado",
    meta: "Estado",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
    ),
  },
  {
    accessorKey: "Observacion",
    meta: "Observación",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Observación" />
    ),
  },
  {
    accessorKey: "EstadoMunicipio",
    meta: "Estado Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado Municipio" />
    ),
  },
  {
    accessorKey: "acciones",
    meta: "Acciones",
    enableSorting: false,
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Acciones" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-row">
        <Button size="sm" variant="outline" className="cursor-pointer"
          onClick={() => handleVerArchivosClick(row.original.ID_Lugar_Poblado)}>
          <Archive />
          Archivos
        </Button>
      </div>
    )
  }
]
