import { Header } from '@/components/header-pages'
import React from 'react'
import { municipiosDescription } from '../listar-municipios/page'

export default function DetalleAldeasCaserios() {
  return (
    <>
        <Header title='REPORTE DETALLE ALDEAS Y CASERÍOS' description={municipiosDescription} />
    </>
  )
}
