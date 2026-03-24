import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'

const NuevaOrden = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Nueva Orden de Servicio</strong> <small>GD Motors</small>
          </CCardHeader>
          <CCardBody>
            <CForm>
              {/* SECCIÓN 1: DATOS DEL CLIENTE */}
              <h5 className="mb-3 text-info">1. Información del Cliente</h5>
              <CRow className="mb-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="nombre">Nombre</CFormLabel>
                  <CFormInput type="text" id="nombre" placeholder="Ej: Juan" />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="apellido">Apellido</CFormLabel>
                  <CFormInput type="text" id="apellido" placeholder="Ej: Pérez" />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="telefono">Teléfono</CFormLabel>
                  <CFormInput type="tel" id="telefono" placeholder="310..." />
                </CCol>
              </CRow>

              {/* SECCIÓN 2: DATOS DEL VEHÍCULO */}
              <h5 className="mb-3 text-info">2. Datos del Vehículo</h5>
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel htmlFor="tipo">Tipo de Vehículo</CFormLabel>
                  <CFormSelect id="tipo">
                    <option>Seleccionar...</option>
                    <option value="moto">Moto</option>
                    <option value="carro">Carro</option>
                    <option value="buseta">Buseta</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="placa">Placa</CFormLabel>
                  <CFormInput type="text" id="placa" placeholder="ABC-123" />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="marca">Marca y Modelo</CFormLabel>
                  <CFormInput type="text" id="marca" placeholder="Toyota Corolla" />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="color">Color</CFormLabel>
                  <CFormInput type="text" id="color" placeholder="Blanco" />
                </CCol>
              </CRow>

              {/* SECCIÓN 3: SERVICIOS Y ASIGNACIÓN */}
              <h5 className="mb-3 text-info">3. Servicio y Personal</h5>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="servicio">Servicio Principal</CFormLabel>
                  <CFormSelect id="servicio">
                    <option>Seleccionar servicio...</option>
                    <option value="1">Lavado General</option>
                    <option value="2">Polichado</option>
                    <option value="3">Lavado de Motor</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="operador">Operador Asignado</CFormLabel>
                  <CFormSelect id="operador">
                    <option>Seleccionar operador...</option>
                    {/* Aquí se filtrará por habilidades luego */}
                  </CFormSelect>
                </CCol>
              </CRow>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="secondary" className="me-md-2">Cancelar</CButton>
                <CButton color="info">Generar Orden Física</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NuevaOrden