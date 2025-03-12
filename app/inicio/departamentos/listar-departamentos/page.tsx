"use client";

import { Header } from '@/components/header-pages'
import React, { useEffect, useState } from 'react'
import { columns, Departamento } from './columns'
import { DataTable } from '@/components/data-table'
import axios from 'axios';
import { CopyToClipboard, ExportAsExcel, ExportAsPdf, PrintDocument } from '@siamf/react-export'
import { Button } from '@/components/ui/button';
import { Copy, FileText, Printer, Table2 } from 'lucide-react';

export const departamentosDescription = (
  <>
    La <span className='font-semibold'> República de Guatemala </span> 
    está dividida territorialmente en 22 departamentos, 
    que se pueden observar en las siguiente tabla.
  </>
)

export default function ListarDepartamentos() {
  const [ departamentos, setDepartamentos ] = useState<Departamento[]>([]);

  useEffect(() => {
    const getDepartamentos = async () => {
      const res = await axios.get('/api/departamentos');
      const deptos: Departamento[] = res.data.departamentos;
      
      setDepartamentos(deptos);
    }

    getDepartamentos();
  }, [])

  return (
    <>
      <div className='py-5'>
        <Header title='Reporte Departamental' description={departamentosDescription} />
        <DataTable columns={columns} data={departamentos} />
      </div>
    </>
  )
}
