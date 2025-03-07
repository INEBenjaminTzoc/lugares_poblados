"use client";

import { Header } from '@/components/header-pages'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { columns, Municipio } from './columns';
import { DataTable } from '@/components/data-table';

export const municipiosDescription = (
  <>
    La <span className='font-semibold'> República de Guatemala </span> 
    está conformada por 22 departamentos que agrupan a 340 municipios, 
    los cuales cuentan con un alto nivel de autonomía con respecto al gobierno central.
  </>
)

export default function ListarMunicipios() {
  const [ municipios, setMunicipios ] = useState<Municipio[]>([]);

  useEffect(() => {
    const getMunicipios = async () => {
      const res = await axios.get('/api/municipios');
      const municipios: Municipio[] = res.data.municipios;

      setMunicipios(municipios);
    }

    getMunicipios();
  })

  return (
    <>
      <div className='py-5'>
        <Header title='Reporte Municipal' description={municipiosDescription} />
        <DataTable columns={columns} data={municipios} />
      </div>
    </>
  )
}
