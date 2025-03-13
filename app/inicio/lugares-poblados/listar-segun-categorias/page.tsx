"use client";

import { Header } from '@/components/header-pages';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { File, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Departamento } from '../../departamentos/listar-departamentos/columns';
import { Municipio } from '../../municipios/listar-municipios/columns';
import { MultiSelect } from '@/components/multi-select';
import { ArchivoLugarPoblado, columns, DetalleLugarPoblado } from './columns';
import { DataTable } from '@/components/data-table';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import moment from 'moment';

export interface multiSelectTemplate {
  value: string
  label: string
}

export const lugaresPobladosDescription = (
  <>
    Según las proyecciones del <span className='font-semibold'> Instituto Nacional de Estadística</span> 
    , con base en el censo nacional de población 2002.
  </>
)

export default function ListarSegunCategorias() { 
  const [ departamentos, setDepartamentos ] = useState<multiSelectTemplate[]>([]);
  const [ municipios, setMunicipios ] = useState<multiSelectTemplate[]>([]);
  const [ estados, setEstados ] = useState<multiSelectTemplate[]>([]);

  const [ departamentosSelected, setDepartamentosSelected ] = useState<number[]>([]);
  const [ municipiosSelected, setMunicipiosSelected ] = useState<number[]>([]);
  const [ estadosSelected, setEstadosSelected ] = useState<number[]>([]);
  
  const [ lugaresPoblados, setLugaresPoblados ] = useState<DetalleLugarPoblado[]>([]);

  useEffect(() => {
    const getInitialData = async () => {
      const getDepartamentos = await axios.get('/api/departamentos');
      const departamentos: Departamento[] = getDepartamentos.data.departamentos;

      departamentos.map(depto => {
        setDepartamentos(dept => [...dept, { value: depto.id.toString(), label: depto.nombre }]);
      })

      const getEstados = await axios.get('/api/estados');
      const estados: { idestado: number, etiqueta: string }[] = getEstados.data.estados;
    
      estados.map(estado => {
        setEstados(est => [ ...est, { value: estado.idestado.toString(), label: estado.etiqueta } ]);
      })
    }
    getInitialData();
  }, []);

  const handleDepartamentoChange = (valuesSelected: string[]) => {
    setMunicipios([]);
    let valuesParsed = [] as number[];

    valuesSelected.map(value => {
      valuesParsed.push(parseInt(value));
    });

    setDepartamentosSelected(valuesParsed); 
    
    valuesSelected.map(async (value) => {
      const idDepartamento = parseInt(value);
      const res = await axios.get(`/api/municipios/lista-municipios/${idDepartamento}`);
      const municipios: Municipio[] = res.data.municipios;

      municipios.map(municipio => {
        setMunicipios(mun => [ ...mun, { value: municipio.idMunicipio.toString(), label: municipio.municipio } ])
      })
    });
  };

  const handleMunicipioChange = (valuesSelected: string[]) => {
    let valuesParsed = [] as number[];

    valuesSelected.map(value => {
      valuesParsed.push(parseInt(value));
    })

    setMunicipiosSelected(valuesParsed);
  };
  
  const handleEstadoChange = (valuesSelected: string[]) => {
    let valuesParsed = [] as number[];

    valuesSelected.map(value => {
      valuesParsed.push(parseInt(value));
    })

    setEstadosSelected(valuesParsed)
  };

  const handleClickSearch = async () => {
    setLugaresPoblados([]);
    const res = await axios
        .post('/api/lugares-poblados/listar-segun-categorias', 
          { 
            departamento: departamentosSelected, 
            municipio: municipiosSelected, 
            estado: estadosSelected });
    const detalleLugaresPoblados: DetalleLugarPoblado[] = res.data.lugaresPoblados;

    setLugaresPoblados(detalleLugaresPoblados);
  }

  const [ dialogIsOpen, setDialogIsOpen ] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>("ARCHIVOS DISPONIBLES");
  const [archivos, setArchivos] = useState<ArchivoLugarPoblado[]>([]);
  const [blobUrl, setBlobUrl] = useState<string>();

  const handleVerArchivosClick = async (idLugarPoblado: number) => {
    //SE SETEA EL TITULO DEL DIALOG
    const lugPob = lugaresPoblados.find(lugPob => lugPob.ID_Lugar_Poblado === idLugarPoblado);
    setDialogTitle(`ARCHIVOS: ${lugPob?.Nombre} - ${lugPob?.Municipio} - ${lugPob?.Departamento}`)
    //SE OBTIENEN LOS ARCHIVOS DEL MUNICIPIO DESDE LA BASE DE DATOS
    const res = await axios.get(`/api/lugares-poblados/obtener-archivos/${idLugarPoblado}`);
    const archivosDisponibles: ArchivoLugarPoblado[] = res.data.archivosDisponibles;
    setArchivos(archivosDisponibles);

    //SI EL MUNICIPIO TIENE ARCHIVOS SE OBTIENE EL PRIMER ARCHIVO Y SE MUESTRA EN EL DIALOG
    if(archivosDisponibles.length > 0) {
      const resArchivo = await axios.get(`/api/lugares-poblados/descargar-archivo/${archivosDisponibles[0].ID_Archivo}`);
      console.log(resArchivo);
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

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={() => { setDialogIsOpen(!dialogIsOpen) }}>
        <DialogContent className='px-0 pt-5 h-[90vh] sm:max-w-[90vw] w-[90vw] overflow-hidden'>
          <DialogTitle className='px-5'>{dialogTitle}</DialogTitle>
          <DialogDescription className='sr-only'>archivos del lugar poblado</DialogDescription>
          <div className="w-full h-full">
            <SidebarProvider className="items-start h-full">
              <Sidebar collapsible="none" className="hidden md:flex">
                <SidebarContent className='py-3'>
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {archivos.length > 0 && archivos.map((archivo) => (
                          <SidebarMenuItem key={archivo.ID_Archivo}>
                            <SidebarMenuButton asChild>
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
        <Header title='Reporte Lugares Poblados' description={lugaresPobladosDescription} />
        <div className='w-full flex flex-row mt-4 gap-x-3'>
          <div className='w-60'>
            <MultiSelect 
              options={departamentos}
              onValueChange={handleDepartamentoChange}
              placeholder='Departamentos'
              maxCount={2}
            />
          </div>
          <div className='w-60'>
            <MultiSelect 
              options={municipios}
              onValueChange={handleMunicipioChange}
              placeholder='Municipios'
              maxCount={2}
            />
          </div>
          <div className='w-60'>
            <MultiSelect 
              options={estados}
              onValueChange={handleEstadoChange}
              placeholder='Estados'
              maxCount={2}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleClickSearch}>
            <Search />
          </Button>
        </div>
        <DataTable columns={columns(handleVerArchivosClick)} data={lugaresPoblados} />
      </div>
    </>
  )
}
