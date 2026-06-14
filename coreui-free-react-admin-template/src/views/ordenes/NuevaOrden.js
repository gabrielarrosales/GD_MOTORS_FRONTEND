import React, { useState, useMemo } from 'react'
import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput,
  CFormLabel, CFormSelect, CRow, CTable, CTableHead, CTableRow,
  CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalBody,
  CFormTextarea, CInputGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { 
  cilPencil, cilTrash, cilPlus, cilCheckCircle, 
  cilUserPlus, cilLibraryAdd, cilX, cilInfo, cilSearch, cilFilterX
} from '@coreui/icons'

const HistorialOrdenes = () => {
  // --- ESTADO DE DATOS ---
  const [ordenes, setOrdenes] = useState([
    { 
      id: 'GDM-1001', 
      fecha: '2026-03-24', 
      nombre: 'Carlos', 
      apellido: 'Sánchez', 
      telefono: '3001234567',
      vehiculo: { tipo: 'Carro', marca: 'Mazda', modelo: '3', color: 'Rojo cereza' },
      servicios: ['Lavado General'],
      toppings: ['Siliconado de llantas'],
      empleados: ['Andrés'],
      descripcion: 'Cuidado especial con los rines.',
      total: 35000
    }
  ])

  // --- ESTADOS DE UI ---
  const [serviciosList, setServiciosList] = useState([''])
  const [empleadosList, setEmpleadosList] = useState([''])
  const [toppingsList, setToppingsList] = useState([''])
  const [filtroDesde, setFiltroDesde] = useState('')
  const [filtroHasta, setFiltroHasta] = useState('')
  
  const [modalForm, setModalForm] = useState({ visible: false, modo: 'crear', datos: null })
  const [modalDetalle, setModalDetalle] = useState(null)
  const [modalConfirmarEliminar, setModalConfirmarEliminar] = useState(null)
  const [modalAlerta, setModalAlerta] = useState({ visible: false, mensaje: '', tipo: 'exito' })

  // --- FUNCIONES AUXILIARES ---
  const addField = (list, setList) => setList([...list, ''])
  const removeField = (index, list, setList) => list.length > 1 && setList(list.filter((_, i) => i !== index))

  const lanzarAlerta = (msg) => {
    setModalAlerta({ visible: true, mensaje: msg, tipo: 'exito' });
    setTimeout(() => setModalAlerta({ visible: false, mensaje: '', tipo: 'exito' }), 2000);
  }

  const handleEliminar = () => {
    setOrdenes(ordenes.filter(o => o.id !== modalConfirmarEliminar.id))
    setModalConfirmarEliminar(null)
    lanzarAlerta("¡ORDEN ELIMINADA!")
  }

  const handleGuardar = () => {
    const modo = modalForm.modo;
    setModalForm({ ...modalForm, visible: false });
    lanzarAlerta(modo === 'crear' ? "¡ORDEN CREADA CON ÉXITO!" : "¡CAMBIOS GUARDADOS!");
  }

  const limpiarFiltros = () => {
    setFiltroDesde('');
    setFiltroHasta('');
  }

  // --- ESTILOS PERSONALIZADOS ---
  const darkModalStyle = { backgroundColor: '#1b2028', color: '#FFF', borderRadius: '15px' }
  const vividRed = '#E31E24'
  const headerStyle = { backgroundColor: '#000', color: '#FFF', borderBottom: `3px solid ${vividRed}`, textAlign: 'center' }
  const cellStyle = { color: '#000', fontWeight: '700', fontSize: '1rem', textAlign: 'center', borderBottom: '1px solid #dee2e6' }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 shadow-sm" style={{ border: 'none' }}>
          <CCardHeader className="bg-black text-white d-flex justify-content-between align-items-center py-3">
            <h4 className="m-0" style={{ letterSpacing: '1px' }}>HISTORIAL GD MOTORS</h4>
            <CButton color="danger" style={{backgroundColor: vividRed}} onClick={() => setModalForm({ visible: true, modo: 'crear', datos: null })}>
              <CIcon icon={cilPlus} className="me-2" /> NUEVA ORDEN
            </CButton>
          </CCardHeader>
          
          <CCardBody>
            <CRow className="mb-4 align-items-end">
              <CCol md={3}>
                <CFormLabel className="fw-bold">DESDE</CFormLabel>
                <CFormInput type="date" value={filtroDesde} onChange={(e) => setFiltroDesde(e.target.value)} />
              </CCol>
              <CCol md={3}>
                <CFormLabel className="fw-bold">HASTA</CFormLabel>
                <CFormInput type="date" value={filtroHasta} onChange={(e) => setFiltroHasta(e.target.value)} />
              </CCol>
              <CCol md={4} className="d-flex gap-2">
                <CButton color="dark" className="text-white fw-bold px-4">
                  <CIcon icon={cilSearch} className="me-2" /> BUSCAR
                </CButton>
                <CButton color="secondary" variant="outline" className="fw-bold" onClick={limpiarFiltros}>
                  <CIcon icon={cilFilterX} className="me-2" /> LIMPIAR
                </CButton>
              </CCol>
            </CRow>

            <CTable align="middle" responsive hover className="border">
              <CTableHead style={headerStyle}>
                <CTableRow>
                  <CTableHeaderCell className="py-3">N° ORDEN</CTableHeaderCell>
                  <CTableHeaderCell className="py-3">FECHA DE EMISIÓN</CTableHeaderCell>
                  <CTableHeaderCell className="py-3">ACCIONES</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ordenes.map((o) => (
                  <CTableRow key={o.id}>
                    <CTableDataCell style={cellStyle}>
                      <CButton color="link" className="text-danger fw-bold text-decoration-none" onClick={() => setModalDetalle(o)}>
                        {o.id}
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell style={cellStyle}>{o.fecha}</CTableDataCell>
                    <CTableDataCell style={cellStyle}>
                      <CButton color="danger" size="sm" className="me-2" onClick={() => setModalForm({ visible: true, modo: 'editar', datos: o })}>
                        <CIcon icon={cilPencil} /> 
                      </CButton>
                      <CButton size="sm" style={{ backgroundColor: '#FF0000', border: 'none', color: 'white' }} onClick={() => setModalConfirmarEliminar(o)}>
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* MODAL: FORMULARIO (CREAR/EDITAR) */}
      <CModal visible={modalForm.visible} onClose={() => setModalForm({ ...modalForm, visible: false })} size="xl" backdrop="static">
        <CCardHeader className="bg-black text-white p-3"><h5 className="m-0">GESTIÓN DE ORDEN</h5></CCardHeader>
        <CModalBody className="p-4 bg-light">
          <CForm>
            <h6 className="text-danger fw-bold mb-3 border-bottom border-danger pb-2">1. INFORMACIÓN DEL CLIENTE</h6>
            <CRow className="mb-4">
              <CCol md={4}><CFormLabel>Nombre</CFormLabel><CFormInput placeholder="Ej: Juan" /></CCol>
              <CCol md={4}><CFormLabel>Apellido</CFormLabel><CFormInput placeholder="Ej: Pérez" /></CCol>
              <CCol md={4}><CFormLabel>Teléfono</CFormLabel><CFormInput placeholder="310..." /></CCol>
            </CRow>

            <h6 className="text-danger fw-bold mb-3 border-bottom border-danger pb-2">2. DATOS DEL VEHÍCULO</h6>
            <CRow className="mb-4">
              <CCol md={3}><CFormLabel>Tipo</CFormLabel><CFormSelect><option>Seleccionar...</option><option>Carro</option><option>Moto</option></CFormSelect></CCol>
              <CCol md={3}><CFormLabel>Marca</CFormLabel><CFormSelect><option>Seleccionar Marca...</option><option>Toyota</option><option>Mazda</option></CFormSelect></CCol>
              <CCol md={3}><CFormLabel>Modelo</CFormLabel><CFormSelect><option>Seleccionar Modelo...</option><option>Corolla</option><option>3</option></CFormSelect></CCol>
              <CCol md={3}><CFormLabel>Color</CFormLabel><CFormSelect><option>Seleccionar Color...</option><option>Blanco</option><option>Negro</option><option>Rojo</option></CFormSelect></CCol>
            </CRow>

            <h6 className="text-danger fw-bold mb-3 border-bottom border-danger pb-2">3. SERVICIO Y PERSONAL</h6>
            <CRow>
              <CCol md={4}>
                <div className="d-flex justify-content-between mb-2"><strong className="text-dark">Servicios</strong><CButton color="dark" size="sm" onClick={() => addField(serviciosList, setServiciosList)}><CIcon icon={cilLibraryAdd} /></CButton></div>
                {serviciosList.map((_, i) => (
                  <CInputGroup key={i} className="mb-2">
                    <CFormSelect><option value="">Seleccionar servicio...</option><option>Lavado General</option></CFormSelect>
                    <CButton color="danger" variant="outline" onClick={() => removeField(i, serviciosList, setServiciosList)}><CIcon icon={cilX} /></CButton>
                  </CInputGroup>
                ))}
              </CCol>
              <CCol md={4}>
                <div className="d-flex justify-content-between mb-2"><strong className="text-dark">Toppings</strong><CButton color="dark" size="sm" onClick={() => addField(toppingsList, setToppingsList)}><CIcon icon={cilPlus} /></CButton></div>
                {toppingsList.map((_, i) => (
                  <CInputGroup key={i} className="mb-2">
                    <CFormSelect><option value="">Seleccionar topping...</option><option>Siliconado de llantas</option></CFormSelect>
                    <CButton color="danger" variant="outline" onClick={() => removeField(i, toppingsList, setToppingsList)}><CIcon icon={cilX} /></CButton>
                  </CInputGroup>
                ))}
              </CCol>
              <CCol md={4}>
                <div className="d-flex justify-content-between mb-2"><strong className="text-dark">Operadores</strong><CButton color="dark" size="sm" onClick={() => addField(empleadosList, setEmpleadosList)}><CIcon icon={cilUserPlus} /></CButton></div>
                {empleadosList.map((_, i) => (
                  <CInputGroup key={i} className="mb-2">
                    <CFormSelect><option value="">Seleccionar operador...</option><option>Andrés</option></CFormSelect>
                    <CButton color="danger" variant="outline" onClick={() => removeField(i, empleadosList, setEmpleadosList)}><CIcon icon={cilX} /></CButton>
                  </CInputGroup>
                ))}
              </CCol>
            </CRow>

            <CRow className="mt-3">
              <CCol md={12}>
                <CFormLabel className="fw-bold text-dark">INFORMACIÓN ADICIONAL DEL SERVICIO</CFormLabel>
                <CFormTextarea rows={3} placeholder="Escriba detalles extras aquí..." />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <div className="bg-black p-3 d-flex justify-content-end gap-2">
          <CButton color="secondary" onClick={() => setModalForm({ ...modalForm, visible: false })}>CANCELAR</CButton>
          <CButton color="danger" className="px-4" onClick={handleGuardar}>GENERAR ORDEN</CButton>
        </div>
      </CModal>

      {/* MODAL: DETALLE COMPLETO */}
      <CModal visible={!!modalDetalle} onClose={() => setModalDetalle(null)} size="lg" centered>
        <div style={darkModalStyle} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-2">
            <h3 className="m-0 text-danger fw-bold">RESUMEN DE ORDEN: {modalDetalle?.id}</h3>
            <CIcon icon={cilInfo} size="xl" />
          </div>
          <CRow className="g-4">
            <CCol md={6}>
              <h6 className="text-uppercase text-secondary small fw-bold">Cliente</h6>
              <p className="h5">{modalDetalle?.nombre} {modalDetalle?.apellido}</p>
              <p className="mb-0 text-secondary">Tel: {modalDetalle?.telefono}</p>
            </CCol>
            <CCol md={6}>
              <h6 className="text-uppercase text-secondary small fw-bold">Vehículo</h6>
              <p className="h5">{modalDetalle?.vehiculo.marca} {modalDetalle?.vehiculo.modelo}</p>
              <p className="mb-0 text-secondary">Color: {modalDetalle?.vehiculo.color}</p>
            </CCol>
            <CCol md={6}>
              <h6 className="text-uppercase text-secondary small fw-bold">Servicios / Toppings</h6>
              <ul className="list-unstyled">
                {modalDetalle?.servicios.map((s, i) => <li key={i} className="text-white">✓ {s}</li>)}
                {modalDetalle?.toppings.map((t, i) => <li key={i} className="text-info small"> + {t}</li>)}
              </ul>
            </CCol>
            <CCol md={6}>
              <h6 className="text-uppercase text-secondary small fw-bold">Personal y Notas</h6>
              <p className="text-white mb-1">Operador: {modalDetalle?.empleados.join(', ')}</p>
              <p className="text-secondary small italic">"{modalDetalle?.descripcion}"</p>
            </CCol>
            <CCol xs={12} className="border-top border-secondary pt-3 mt-4 d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase text-secondary small fw-bold">Total del Servicio</h6>
                <p className="h3 text-danger fw-black">${modalDetalle?.total.toLocaleString()}</p>
              </div>
              <CButton color="light" variant="outline" onClick={() => setModalDetalle(null)}>CERRAR</CButton>
            </CCol>
          </CRow>
        </div>
      </CModal>

      {/* MODAL CONFIRMACIÓN ELIMINAR */}
      <CModal visible={!!modalConfirmarEliminar} onClose={() => setModalConfirmarEliminar(null)} centered>
        <CModalBody style={darkModalStyle} className="text-center p-5">
           <CIcon icon={cilTrash} size="3xl" className="text-danger mb-3" />
           <h2 className="fw-bold mb-4">¿ELIMINAR ESTA ORDEN?</h2>
           <div className="d-flex justify-content-center gap-3">
             <CButton color="light" variant="outline" className="px-4 fw-bold" onClick={() => setModalConfirmarEliminar(null)}>VOLVER</CButton>
             <CButton color="danger" className="px-4 fw-bold" onClick={handleEliminar}>SÍ, ELIMINAR</CButton>
           </div>
        </CModalBody>
      </CModal>

      {/* MODAL ALERTA ÉXITO */}
      <CModal visible={modalAlerta.visible} centered backdrop="static">
        <CModalBody style={darkModalStyle} className="text-center p-5">
           <CIcon icon={cilCheckCircle} size="3xl" className="text-success mb-3" />
           <h2 className="fw-bold">{modalAlerta.mensaje}</h2>
        </CModalBody>
      </CModal>
    </CRow>
  )
}

export default HistorialOrdenes