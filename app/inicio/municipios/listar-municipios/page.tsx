"use client";

import { Header } from '@/components/header-pages'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Archivo, columns, Municipio } from './columns';
import { DataTable } from '@/components/data-table';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import { File } from 'lucide-react';
import moment from 'moment';
import { toast } from 'sonner';

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

  const [dialogTitle, setDialogTitle] = useState<string>("ARCHIVOS DISPONIBLES");
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [blobUrl, setBlobUrl] = useState<string>();

  const handleVerArchivosClick = async (idMunicipio: number) => {
    //SE SETEA EL TITULO DEL DIALOG
    const municipio = municipios.find(mun => mun.idMunicipio === idMunicipio);
    setDialogTitle(`ARCHIVOS: ${municipio?.idMunicipio} ${municipio?.municipio} - ${municipio?.departamento}`)
    //SE OBTIENEN LOS ARCHIVOS DEL MUNICIPIO DESDE LA BASE DE DATOS
    const res = await axios.get(`/api/municipios/obtener-archivos/${idMunicipio}`);
    const archivosDisponibles: Archivo[] = res.data.archivosDisponibles;
    setArchivos(archivosDisponibles);

    //SI EL MUNICIPIO TIENE ARCHIVOS SE OBTIENE EL PRIMER ARCHIVO Y SE MUESTRA EN EL DIALOG
    if(archivosDisponibles.length > 0) {
      const resArchivo = await axios.get(`/api/municipios/descargar-archivo/${archivosDisponibles[0].ID_Archivo}`);
      //CONVERSION DEL ARCHIVO DE BASE64 A BLOB DEBIDO A QUE EXISTEN ARCHIVOS DE MUCHO PESO
      const byteArray = Uint8Array.from(atob(resArchivo.data.ArchivoBase64), (char) => char.charCodeAt(0));
      const blob = new Blob([byteArray], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);

      setDialogIsOpen(true);  //SE ABRE EL DIALOG
      return () => {
        URL.revokeObjectURL(url);
      }
    }
    //SI EL MUNICIPIO NO CUENTA CON ARCHIVOS SE MUESTRA UN ERROR
    toast.error("Ningún archivo encontrado");
  }

  const handleVerArchivo = async (idArchivo: number) => {
    //SE OBTIENE EL ARCHIVO SELECCIONADO
    const archivoSeleccionado = archivos.find(archivo => archivo.ID_Archivo === idArchivo);
    const res = await axios.get(`/api/municipios/descargar-archivo/${archivoSeleccionado?.ID_Archivo}`);
    //CONVERSION DEL ARCHIVO DE BASE64 A BLOB DEBIDO A QUE EXISTEN ARCHIVOS DE MUCHO PESO
    const byteArray = Uint8Array.from(atob(res.data.ArchivoBase64), (char) => char.charCodeAt(0));
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);
    
    return () => {
      URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={() => { setDialogIsOpen(!dialogIsOpen) }}>
        <DialogContent className='px-0 pt-5 h-[90vh] sm:max-w-[90vw] w-[90vw] overflow-hidden'>
          <DialogTitle className='px-5'>{dialogTitle}</DialogTitle>
          <DialogDescription className='sr-only'>archivos del municipio</DialogDescription>
          <div className="w-full h-full">
            <SidebarProvider className="items-start h-full">
              <Sidebar collapsible="none" className="hidden md:flex">
                <SidebarContent className='py-3'>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {archivos.length > 0 && archivos.map((archivo) => (
                          <SidebarMenuItem key={archivo.ID_Archivo}>
                            <SidebarMenuButton asChild onClick={() => handleVerArchivo(archivo.ID_Archivo)}>
                              <a href="#">
                                <File />
                                <div className='flex flex-col'>
                                  <p className='whitespace-normal'>{archivo.Numero} - {archivo.Tipo_Archivo}</p>
                                  <p className='text-xs text-muted-foreground'>
                                    {moment(archivo.Fecha).format('DD-MM-YYYY')}
                                  </p>
                                </div>
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
                <iframe src={blobUrl} 
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
