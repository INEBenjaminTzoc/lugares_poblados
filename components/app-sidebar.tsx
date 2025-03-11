"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  ClipboardPenLine,
  Command,
  Database,
  Frame,
  House,
  LifeBuoy,
  Map,
  MapPinHouse,
  MapPinned,
  NotebookPen,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  TableProperties,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Departamentos",
      url: "#",
      icon: MapPinned,
      items: [
        {
          title: "Listar Departamentos",
          url: "/inicio/departamentos/listar-departamentos",
        }
      ],
    },
    {
      title: "Municipios",
      url: "#",
      icon: MapPinHouse,
      items: [
        {
          title: "Listar Municipios",
          url: "/inicio/municipios/listar-municipios",
        },
        {
          title: "Detalle Aldeas, Caserios",
          url: "/inicio/municipios/detalle-aldeas-caserios",
        },
        {
          title: "Detalle Todas las Categorías",
          url: "/inicio/municipios/detalle-completo",
        },
      ],
    },
    {
      title: "Lugares Poblados",
      url: "#",
      icon: House,
      items: [
        {
          title: "Listar Según Categorías",
          url: "/inicio/lugares-poblados/listar-segun-categorias",
        },
        {
          title: "Listar Según Categorías 2002",
          url: "/inicio/lugares-poblados/listar-segun-categorias-2002",
        },
        {
          title: "Listar Todos los Lugares Poblados 2018",
          url: "/inicio/lugares-poblados/listar-todos-lugares-poblados-2018",
        },
        {
          title: "Listar Aldeas y Caserios Totales",
          url: "/inicio/lugares-poblados/listar-aldeas-caserios-totales",
        },
        {
          title: "Historial de Lugar Poblado",
          url: "/inicio/lugares-poblados/historial-lugar-poblado",
        },
      ],
    },
    {
      title: "Bases de Datos",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Totales 2018 - 2002",
          url: "/inicio/bases-de-datos/totales-2018-2002",
        },
        {
          title: "Totales 2002",
          url: "#",
        },
      ],
    },
    {
      title: "Bitácora",
      url: "#",
      icon: NotebookPen,
      items: [
        {
          title: "Listar Bitácora por Usuario",
          url: "#",
        },
        {
          title: "Listar Bitácora por Fecha",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Reportes",
      url: "#",
      icon: ClipboardPenLine,
    },
    {
      title: "Multiples Obeservaciones",
      url: "#",
      icon: TableProperties,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

import INE from "@/public/img/INE.png"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                  <Image src={INE} alt="INE" width={40} height={40} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Lugares Poblados</span>
                  <span className="truncate text-xs">Sistema Administrativo</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
