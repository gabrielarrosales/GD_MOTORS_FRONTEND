import React, { useState } from 'react'
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput,
  CFormLabel, CRow, CTable, CTableHead, CTableRow, CTableHeaderCell,
  CTableBody, CTableDataCell, CInputGroup, CInputGroupText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSave, cilHistory, cilMoney, cilCheckCircle } from '@coreui/icons'

const TasasDia = () => {
  const [historialTasas, setHistorialTasas] = useState([
    { id: 1, fecha: '2026-03-24 08:30 AM', tasaBs: 36.50, tasaUsd: 1.00, usuario: 'Admin' },
  ])

  const [tasaActual, setTasaActual] = useState({ bs: '', usd: '1.00' })
  const [alerta, setAlerta] = useState(false)

  const handleGuardarTasa = () => {
    if (!tasaActual.bs) return
    const nuevaEntrada = {
      id: historialTasas.length + 1,
      fecha: new Date().toLocaleString(),
      tasaBs: parseFloat(tasaActual.bs),
      tasaUsd: parseFloat(tasaActual.usd),
      usuario: 'Admin'
    }
    setHistorialTasas([nuevaEntrada, ...historialTasas])
    setAlerta(true)
    setTimeout(() => setAlerta(false), 2000)
    setTasaActual({ ...tasaActual, bs: '' })
  }

  const vividRed = '#E31E24'
  const headerStyle = { backgroundColor: '#000', color: '#FFF', borderBottom: `3px solid ${vividRed}`, textAlign: 'center' }
  const cellStyle = { color: '#000', fontWeight: '700', fontSize: '1.1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm" style={{ border: 'none' }}>
          <CCardHeader className="bg-black text-white py-3">
            <h4 className="m-0" style={{ letterSpacing: '1px' }}>
              <CIcon icon={cilMoney} className="me-2" /> ACTUALIZAR TASAS DE CAMBIO
            </h4>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm>
              <CRow className="align-items-end">
                <CCol md={4}>
                  <CFormLabel className="fw-bold text-dark">TASA BS (Soberanos)</CFormLabel>
                  <CInputGroup size="lg">
                    <CInputGroupText className="bg-dark text-white border-dark">Bs.</CInputGroupText>
                    <CFormInput 
                      placeholder="0.00" 
                      type="number"
                      value={tasaActual.bs}
                      onChange={(e) => setTasaActual({...tasaActual, bs: e.target.value})}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={4}>
                  <CFormLabel className="fw-bold text-dark">TASA DÓLARES</CFormLabel>
                  <CInputGroup size="lg">
                    <CInputGroupText className="bg-dark text-white border-dark">$</CInputGroupText>
                    <CFormInput 
                      placeholder="1.00" 
                      type="number"
                      value={tasaActual.usd}
                      onChange={(e) => setTasaActual({...tasaActual, usd: e.target.value})}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={4}>
                  <CButton 
                    color="danger" 
                    size="lg" 
                    className="w-100 fw-bold" 
                    style={{ backgroundColor: vividRed, border: 'none' }}
                    onClick={handleGuardarTasa}
                  >
                    <CIcon icon={cilSave} className="me-2" /> ACTUALIZAR AHORA
                  </CButton>
                </CCol>
              </CRow>
              {alerta && (
                <div className="text-success fw-bold mt-2 d-flex align-items-center">
                  <CIcon icon={cilCheckCircle} className="me-1" /> ¡TASAS ACTUALIZADAS!
                </div>
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="shadow-sm" style={{ border: 'none' }}>
          <CCardHeader className="bg-black text-white py-3">
            <h5 className="m-0"><CIcon icon={cilHistory} className="me-2" /> HISTORIAL DE CAMBIOS</h5>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" responsive hover className="border">
              <CTableHead style={headerStyle}>
                <CTableRow>
                  <CTableHeaderCell className="py-3">FECHA Y HORA</CTableHeaderCell>
                  <CTableHeaderCell className="py-3">TASA BS</CTableHeaderCell>
                  <CTableHeaderCell className="py-3">TASA USD</CTableHeaderCell>
                  <CTableHeaderCell className="py-3">USUARIO</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {historialTasas.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell style={cellStyle}>{item.fecha}</CTableDataCell>
                    <CTableDataCell style={cellStyle} className="text-danger">
                      {item.tasaBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs.
                    </CTableDataCell>
                    <CTableDataCell style={cellStyle}>
                      {item.tasaUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })} $
                    </CTableDataCell>
                    <CTableDataCell style={cellStyle}>
                      <span className="badge bg-dark px-3">{item.usuario}</span>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default TasasDia