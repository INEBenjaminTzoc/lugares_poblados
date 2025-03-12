"use client"

import { DataTableColumnHeader } from "@/components/datatable-column-header"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { ColumnDef } from "@tanstack/react-table"
import axios from "axios"
import { Archive } from "lucide-react"
import { useState } from "react"

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

// const handleVerArchivosClick = async ( idMunicipio: number ) => {
//   const res = await axios.get(`/api/municipios/obtener-archivos/${idMunicipio}`);
//   const archivosDisponibles: Archivo[] = res.data.archivosDisponibles;
//   console.log(archivosDisponibles);
//   setArchivos(archivosDisponibles);
// }

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
        <Button size="icon" variant="outline" className="cursor-pointer"
          onClick={() => handleVerArchivosClick(row.original.idMunicipio)}>
          <Archive />
        </Button>
      </div>
    )
  }
]
