import { Header } from '@/components/header-pages'
import React from 'react'
import { municipiosDescription } from '../listar-municipios/page'

export default function DetalleCompleto() {
  return (
    <Header title='REPORTE DETALLE TODAS LAS CATEGORÍAS' description={municipiosDescription} />
  )
}
