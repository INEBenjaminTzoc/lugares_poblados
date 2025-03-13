"use client";

import { Header } from '@/components/header-pages'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Archivo, columns, Municipio } from './columns';
import { DataTable } from '@/components/data-table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { File } from 'lucide-react';

export const municipiosDescription = (
  <>
    La <span className='font-semibold'> República de Guatemala </span> 
    está conformada por 22 departamentos que agrupan a 340 municipios, 
    los cuales cuentan con un alto nivel de autonomía con respecto al gobierno central.
  </>
)

export default function ListarMunicipios() {
  const [ dialogIsOpen, setDialogIsOpen ] = useState<boolean>(false);
  const [ municipios, setMunicipios ] = useState<Municipio[]>([]);

  useEffect(() => {
    const getMunicipios = async () => {
      const res = await axios.get('/api/municipios/lista-municipios');
      const municipios: Municipio[] = res.data.municipios;

      setMunicipios(municipios);
    }

    getMunicipios();
  }, [])

  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [archivoBase64, setArchivoBase64] = useState<string>();

  const handleVerArchivosClick = async (idMunicipio: number) => {
    const res = await axios.get(`/api/municipios/obtener-archivos/${idMunicipio}`);
    const archivosDisponibles: Archivo[] = res.data.archivosDisponibles;
    setArchivos(archivosDisponibles);
    const archivoBase64 = await axios.get(`/api/municipios/descargar-archivo/${archivosDisponibles[0].ID_Archivo}`);
    setArchivoBase64(archivoBase64.data.archivo[0].ArchivoBase64);
    setDialogIsOpen(true);
  }

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={() => { setDialogIsOpen(!dialogIsOpen) }}>
        <DialogContent className='px-0 pt-5 h-[90vh] sm:max-w-[90vw] w-[90vw] overflow-hidden'>
          <DialogTitle className='px-5'>Archivos Disponibles</DialogTitle>
          <DialogDescription className='sr-only'>archivos del municipio</DialogDescription>
          <div className="w-full h-full">
            <SidebarProvider className="items-start h-full">
              <Sidebar collapsible="none" className="hidden md:flex">
                <SidebarContent className='py-3'>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {archivos.map((archivo) => (
                          <SidebarMenuItem key={archivo.ID_Archivo}>
                            <SidebarMenuButton asChild>
                              <a href="#">
                                <File />
                                <span className='h-auto'>{archivo.Numero}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
              <main className='flex h-full flex-1 flex-col overflow-hidden'>
                <iframe src={`data:application/pdf;base64,${archivoBase64}#toolbar=0`} 
                  title="Archivo" className="flex-1" style={{ border: 'none' }} />
              </main>
            </SidebarProvider>
          </div>
        </DialogContent>
      </Dialog>
      <div className='py-5'>
        <Header title='Reporte Municipal' description={municipiosDescription} />
        <DataTable columns={columns(handleVerArchivosClick)} data={municipios} />
      </div>
    </>
  )
}
