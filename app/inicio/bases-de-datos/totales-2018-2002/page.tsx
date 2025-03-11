"use client";

import { Header } from '@/components/header-pages'
import React, { useEffect, useState } from 'react'
import { lugaresPobladosDescription, multiSelectTemplate } from '../../lugares-poblados/listar-segun-categorias/page'
import { MultiSelect } from '@/components/multi-select'
import { Departamento } from '../../departamentos/listar-departamentos/columns';
import axios from 'axios';
import { Municipio } from '../../municipios/listar-municipios/columns';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Totales20182002() {
  const [ departamentos, setDepartamentos ] = useState<multiSelectTemplate[]>([]);
  const [ municipios, setMunicipios ] = useState<multiSelectTemplate[]>([]);
  const [ estados, setEstados ] = useState<multiSelectTemplate[]>([]);

  const [ departamentosSelected, setDepartamentosSelected ] = useState<number[]>([]);
  const [ municipiosSelected, setMunicipiosSelected ] = useState<number[]>([]);
  const [ estadosSelected, setEstadosSelected ] = useState<number[]>([]);
  const [ estadosMunicipioSelected, setEstadosMunicipioSelected ] = useState<string[]>([]);

  const EstadosMunicipio: multiSelectTemplate[] = [
    { value: 'T', label: 'Terminado' },
    { value: 'P', label: 'En Proceso' },
    { value: 'Y', label: 'Iguales' },
  ]

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
    });

    setMunicipiosSelected(valuesParsed)
  };
  
  const handleEstadoChange = (valuesSelected: string[]) => {
    let valuesParsed = [] as number[];

    valuesSelected.map(value => {
      valuesParsed.push(parseInt(value));
    });

    setEstadosSelected(valuesParsed)
  };
  
  const handleEstadoMunicipioChange = (valuesSelected: string[]) => {
    setEstadosMunicipioSelected(valuesSelected);
  };

  const handleClickSearch = async () => {
    console.log(departamentosSelected, municipiosSelected, estadosSelected, estadosMunicipioSelected);
    // setLugaresPobladosHistorial([]);
    const res = await axios
        .post('/api/bases-de-datos/totales-2018-2002', 
          { 
            departamentos: departamentosSelected, 
            municipios: municipiosSelected, 
            estados: estadosSelected,
            estadosMunicipio: estadosMunicipioSelected });

    console.log(res);
    // const lugaresPobladosHistorial: LugaresPobladosHistorial[] = res.data.lugaresPobladosHistorial;

    // setLugaresPobladosHistorial(lugaresPobladosHistorial);
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
                <div className='w-60'>
                  <MultiSelect 
                    options={EstadosMunicipio}
                    onValueChange={handleEstadoMunicipioChange}
                    placeholder='Estados Municipios'
                    maxCount={2}
                  />
                </div>
                <Button variant="outline" size="icon" onClick={handleClickSearch}>
                    <Search />
                </Button>
            </div>
            {/* <DataTable columns={columns} data={lugaresPobladosHistorial} /> */}
        </div>
    </>
  )
}
