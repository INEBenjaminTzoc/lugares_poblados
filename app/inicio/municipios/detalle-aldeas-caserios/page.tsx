"use client";

import { Header } from '@/components/header-pages'
import React, { useEffect, useState } from 'react'
import { municipiosDescription } from '../listar-municipios/page'
import { columns, DetalleAldeaCaserio } from './columns'
import axios from 'axios';
import { DataTable } from '@/components/data-table';

export default function DetalleAldeasCaserios() {
  const [ aldeasCaserios, setAldeasCaserios ] = useState<DetalleAldeaCaserio[]>([]);

  useEffect(() => {
    const getDetalleAldeasCaserios = async () => {
      const res = await axios.get('/api/municipios/detalle-aldeas-caserios');
      console.log(res);
      const detalleAldeasCaserios: DetalleAldeaCaserio[] = res.data.detalleAldeasCaserios;
      
      setAldeasCaserios(detalleAldeasCaserios);
    }

    getDetalleAldeasCaserios();
  }, [])

  return (
    <>
      <div className='py-5'>
        <Header title='Reporte Detalle Aldeas y Caseríos' description={municipiosDescription} />
        <DataTable columns={columns} data={aldeasCaserios} />
      </div>
    </>
  )
}
