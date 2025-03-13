"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Archive } from "lucide-react"

export type Municipio = {
  departamento: string
  idMunicipio: number
  municipio: string
  estado: string
}

export type Archivo = {
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

export const columns = (handleVerArchivosClick: (idMunicipio: number) => void): ColumnDef<Municipio>[] => [
  {
    accessorKey: "departamento",
    meta: "Departamento",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Departamento" />
    ),
  },
  {
    accessorKey: "idMunicipio",
    meta: "Código Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código Municipio" />
    ),
  },
  {
    accessorKey: "municipio",
    meta: "Municipio",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Municipio" />
    ),
  },
  {
    accessorKey: "estado",
    meta: "Estado",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
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
          onClick={() => handleVerArchivosClick(row.original.idMunicipio)}>
          <Archive />
          Archivos
        </Button>
      </div>
    )
  }
]
