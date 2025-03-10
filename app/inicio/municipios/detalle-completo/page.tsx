"use client";

import { Header } from '@/components/header-pages'
import React, { useEffect, useState } from 'react'
import { municipiosDescription } from '../listar-municipios/page'
import { columns, DetalleTodasCategorias } from './columns'
import axios from 'axios';
import { DataTable } from '@/components/data-table';

export default function DetalleCompleto() {
  const [ todasCategorias, setTodasCategorias ] = useState<DetalleTodasCategorias[]>([]);
  
  useEffect(() => {
    const getDetalleTodasCategorias = async () => {
      const res = await axios.get('/api/municipios/detalle-completo');
      console.log(res);
      const detalleTodasCategorias: DetalleTodasCategorias[] = res.data.detalleTodasCategorias;

      setTodasCategorias(detalleTodasCategorias);
    }

    getDetalleTodasCategorias();
  }, [])
  
  return (
    <>
      <div className='py-5'>
        <Header title='Reporte Detalle Todas las Categorías' description={municipiosDescription} />
        <DataTable columns={columns} data={todasCategorias} />
      </div>
    </>
  )
}
