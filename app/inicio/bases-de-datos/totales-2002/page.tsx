"use client";

import { Header } from '@/components/header-pages'
import React, { useEffect, useState } from 'react'
import { lugaresPobladosDescription, multiSelectTemplate } from '../../lugares-poblados/listar-segun-categorias/page'
import { MultiSelect } from '@/components/multi-select'
import axios from 'axios';
import { Municipio } from '../../municipios/listar-municipios/columns';
import { Departamento } from '../../departamentos/listar-departamentos/columns';
import { AldeasCaserios2002, columnsAldeasCaserios2002 } from '../totales-2018-2002/columns';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Totales2002() {
  const [ departamentos, setDepartamentos ] = useState<multiSelectTemplate[]>([]);
  const [ municipios, setMunicipios ] = useState<multiSelectTemplate[]>([]);

  const [ departamentosSelected, setDepartamentosSelected ] = useState<number[]>([]);
  const [ municipiosSelected, setMunicipiosSelected ] = useState<number[]>([]);

  const [aldeasCaserios2002, setAldeasCaserios2002] = useState<AldeasCaserios2002[]>([]);

  useEffect(() => {
    const getInitialData = async () => {
      const getDepartamentos = await axios.get('/api/departamentos');
      const departamentos: Departamento[] = getDepartamentos.data.departamentos;

      departamentos.map(depto => {
        setDepartamentos(dept => [...dept, { value: depto.id.toString(), label: depto.nombre }]);
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

  const handleClickSearch = async () => {
    setAldeasCaserios2002([]);
    const res = await axios
        .post('/api/bases-de-datos/totales-2002', 
          { 
            departamentos: departamentosSelected, 
            municipios: municipiosSelected });

    console.log(res);

    const aldeasCaserios2002: AldeasCaserios2002[] = res.data.aldeasCaserios2002;

    setAldeasCaserios2002(aldeasCaserios2002);
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
          <Button variant="outline" size="icon" onClick={handleClickSearch}>
              <Search />
          </Button>
        </div>
        <DataTable columns={columnsAldeasCaserios2002} data={aldeasCaserios2002} />
      </div>
    </>
  )
}
