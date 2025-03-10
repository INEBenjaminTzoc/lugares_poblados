"use client";

import { Header } from '@/components/header-pages';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Departamento } from '../../departamentos/listar-departamentos/columns';
import { Municipio } from '../../municipios/listar-municipios/columns';
import { MultiSelect } from '@/components/multi-select';
import { columns, DetalleLugarPoblado } from './columns';
import { DataTable } from '@/components/data-table';

interface multiSelectTemplate {
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
    valuesSelected.map(value => 
      setDepartamentosSelected(idDept => [ ...idDept, parseInt(value) ])
    )
    
    setMunicipios([]);
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
    valuesSelected.map(value => 
      setMunicipiosSelected(idMun => [ ...idMun, parseInt(value) ])
    )
  };
  
  const handleEstadoChange = (valuesSelected: string[]) => {
    valuesSelected.map(value => 
      setEstadosSelected(idEst => [ ...idEst, parseInt(value) ])
    )
  };

  const handleClickSearch = async () => {
    const res = await axios
        .post('/api/lugares-poblados/listar-segun-categorias', 
          { 
            departamento: departamentosSelected, 
            municipio: municipiosSelected, 
            estado: estadosSelected });
    const detalleLugaresPoblados: DetalleLugarPoblado[] = res.data.lugaresPoblados;

    setLugaresPoblados(detalleLugaresPoblados);
  }

  return (
    <>
      <div className='py-5'>
        <Header title='Reporte Detalle Todas las Categorías' description={lugaresPobladosDescription} />
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
        <DataTable columns={columns} data={lugaresPoblados} />
      </div>
    </>
  )
}
