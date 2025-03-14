"use client";

import { Header } from '@/components/header-pages'
import React, { useEffect, useState } from 'react'
import { lugaresPobladosDescription, multiSelectTemplate } from '../listar-segun-categorias/page'
import axios from 'axios';
import { Departamento } from '../../departamentos/listar-departamentos/columns';
import { Municipio } from '../../municipios/listar-municipios/columns';
import { MultiSelect } from '@/components/multi-select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { columns, LugaresPobladosHistorial } from './columns';
import { DataTable } from '@/components/data-table';

export default function HistorialLugarPoblado() {
    const [ departamentos, setDepartamentos ] = useState<multiSelectTemplate[]>([]);
    const [ municipios, setMunicipios ] = useState<multiSelectTemplate[]>([]);
    const [ estados, setEstados ] = useState<multiSelectTemplate[]>([]);

    const [ departamentosSelected, setDepartamentosSelected ] = useState<number[]>([]);
    const [ municipiosSelected, setMunicipiosSelected ] = useState<number[]>([]);
    const [ estadosSelected, setEstadosSelected ] = useState<number[]>([]);

    const [ lugaresPobladosHistorial, setLugaresPobladosHistorial ] = useState<LugaresPobladosHistorial[]>([]);

    useEffect(() => {
      const getInitialData = async () => {
        const getDepartamentos = await axios.get('/api/departamentos');
        const departamentos: Departamento[] = getDepartamentos.data.departamentos;

        departamentos.map(depto => {
          setDepartamentos(dept => [...dept, { value: depto.id.toString(), label: depto.nombre }]);
        })

        const getEstados = await axios.get('/api/estados2002');
        const estados: { idestado: number, etiqueta: string }[] = getEstados.data.estados;
      
        estados.map(estado => {
          setEstados(est => [ ...est, { value: estado.idestado.toString(), label: estado.etiqueta } ]);
        })
      }
      getInitialData();
    }, []);

    const handleDepartamentoChange = (valuesSelected: string[]) => {
      setMunicipios([]);
      const valuesParsed = [] as number[];

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
      const valuesParsed = [] as number[];

      valuesSelected.map(value => {
        valuesParsed.push(parseInt(value));
      });

      setMunicipiosSelected(valuesParsed)
    };
    
    const handleEstadoChange = (valuesSelected: string[]) => {
      const valuesParsed = [] as number[];

      valuesSelected.map(value => {
        valuesParsed.push(parseInt(value));
      });

      setEstadosSelected(valuesParsed)
    };

    const handleClickSearch = async () => {
      setLugaresPobladosHistorial([]);
      const res = await axios
          .post('/api/lugares-poblados/historial-lugar-poblado', 
            { 
              departamentos: departamentosSelected, 
              municipios: municipiosSelected, 
              estados: estadosSelected });

              console.log(res);
      const lugaresPobladosHistorial: LugaresPobladosHistorial[] = res.data.lugaresPobladosHistorial;

      setLugaresPobladosHistorial(lugaresPobladosHistorial);
    }

  return (
    <>
        <div className="py-5">
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
            <DataTable columns={columns} data={lugaresPobladosHistorial} />
        </div>
    </>
  )
}
