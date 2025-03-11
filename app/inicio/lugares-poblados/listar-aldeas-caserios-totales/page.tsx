"use client";

import { Header } from '@/components/header-pages';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { multiSelectTemplate } from '../listar-segun-categorias/page';
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { generateColumns, MostrarAldeasCaserios } from './columns';
import { DataTable } from '@/components/data-table';
import { ColumnDef } from '@tanstack/react-table';

export const listarAldeasCaseriosTotalesDescription = (
  <>
    Listado de aldeas y caseríos totales por municipio
  </>
)

export default function ListarAldeasCaseriosTotales() {
  const [ filtroSelected, setFiltroSelected ] = useState<number>();
  const [ estados, setEstados ] = useState<multiSelectTemplate[]>([]);
  const [ estadosSelected, setEstadosSelected ] = useState<number[]>([]);

  const [ lugaresPoblados, setLugaresPoblados ] = useState<MostrarAldeasCaserios[]>([]);
  const [ columns, setColumns ] = useState<ColumnDef<MostrarAldeasCaserios>[]>([]);

  useEffect(() => {
      const getInitialData = async () => {
        const getEstados = await axios.get('/api/estados2002');
        const estados: { idestado: number, etiqueta: string }[] = getEstados.data.estados;
      
        estados.map(estado => {
          setEstados(est => [ ...est, { value: estado.idestado.toString(), label: estado.etiqueta } ]);
        })
      }

      getInitialData();
  }, [])
  
  const handleOptionChange = (valuesSelected: string) => {
      setFiltroSelected(parseInt(valuesSelected));
  };

  const handleEstadoChange = (valuesSelected: string[]) => {
    valuesSelected.map(value => 
      setEstadosSelected([ ...estadosSelected, parseInt(value) ])
    )
  };

  const handleClickSearch = async () => {
    setLugaresPoblados([]);
    const res = await axios
        .post('/api/lugares-poblados/listar-aldeas-caserios-totales', 
          { 
            filtro: filtroSelected, 
            estados: estadosSelected });
    let lugaresPoblados: MostrarAldeasCaserios[] = [];
    lugaresPoblados = res.data.aldeasCaseriosTotales as MostrarAldeasCaserios[];

    const columns = generateColumns(lugaresPoblados) as ColumnDef<MostrarAldeasCaserios>[];
    setColumns(columns);
    setLugaresPoblados(lugaresPoblados);
  }

  return (
    <>
        <div className="py-5">
            <Header title='Reporte Lugares Poblados' description={listarAldeasCaseriosTotalesDescription} />
            <div className="w-full flex flex-row mt-4 gap-x-3">
                <div className="w-60">
                    <Select onValueChange={handleOptionChange}>
                        <SelectTrigger className='w-60'>
                            <SelectValue placeholder="Filtros" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='1'>Mostrar aldeas y caserios</SelectItem>
                            <SelectItem value='2'>No mostrar aldeas y caserios</SelectItem>
                            <SelectItem value='3'>Todos los lugares poblados</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-60">
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
            <DataTable columns={columns} data={lugaresPoblados} />
        </div>
    </>
  )
}
