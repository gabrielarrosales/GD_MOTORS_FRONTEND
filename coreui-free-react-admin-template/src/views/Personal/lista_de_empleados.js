import React, { useState } from 'react';

const ListaEmpleados = () => {
  // Filtros de búsqueda y estado
  const [busqueda, setBusqueda] = useState('');
  const [filtroCargo, setFiltroCargo] = useState('Todos');

  // Datos del personal del autolavado
  const [empleados, setEmpleados] = useState([
    { id: 1, nombre: 'Carlos', apellido: 'Mendoza', cedula: 'V-26.123.456', cargo: 'Operador Principal', especialidad: 'Lavado de Chasis / Motores', estado: 'Disponible', serviciosHoy: 5 },
    { id: 2, nombre: 'José Luis', apellido: 'Rodríguez', cedula: 'V-24.987.654', cargo: 'Operador Principal', especialidad: 'Detallado Premium / Pulitura', estado: 'Ocupado', serviciosHoy: 3 },
    { id: 3, nombre: 'Brayan', apellido: 'Gómez', cedula: 'V-28.456.112', cargo: 'Ayudante', especialidad: 'Aspirado y Secado', estado: 'Disponible', serviciosHoy: 6 },
    { id: 4, nombre: 'Luis Alfredo', apellido: 'Colmenares', cedula: 'V-22.333.444', cargo: 'Supervisor de Patio', especialidad: 'Control de Calidad / Auditoría', estado: 'Disponible', serviciosHoy: 1 },
    { id: 5, nombre: 'Andrés', apellido: 'Pérez', cedula: 'V-27.555.999', cargo: 'Ayudante', especialidad: 'Lavado Exprés / Vidrios', estado: 'Ausente', serviciosHoy: 0 },
    { id: 6, nombre: 'Marcos', apellido: 'Táchira', cedula: 'V-25.111.222', cargo: 'Operador Principal', especialidad: 'Tratamientos Cerámicos / Motores', estado: 'Ocupado', serviciosHoy: 4 },
  ]);

  // Filtrado lógico
  const empleadosFiltrados = empleados.filter(empleado => {
    const nombreCompleto = `${empleado.nombre} ${empleado.apellido}`.toLowerCase();
    const coincideBusqueda = nombreCompleto.includes(busqueda.toLowerCase()) || 
                             empleado.cedula.includes(busqueda) ||
                             empleado.especialidad.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCargo = filtroCargo === 'Todos' || empleado.cargo === filtroCargo;
    return coincideBusqueda && coincideCargo;
  });

  return (
    <div style={styles.container}>
      {/* Breadcrumbs superiores copiando la jerarquía de tu UI en la captura image_01461b.png */}
      <div style={styles.breadcrumb}>
        <span style={styles.hogarLink}>Hogar</span> 
        <span style={styles.separator}>/</span> 
        <span style={styles.currentPath}>Administración</span>
        <span style={styles.separator}>/</span> 
        <span style={styles.currentPath}>Personal</span>
      </div>

      {/* Panel Contenedor Principal (Gris claro #dcdcdc de tu UI) */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.redIndicator}></div>
          <h2 style={styles.cardTitle}>REGISTRO Y DISPONIBILIDAD DEL PERSONAL</h2>
        </div>

        {/* Sección de Filtros rápidos */}
        <div style={styles.filterSection}>
          <div style={styles.searchBox}>
            <label style={styles.inputLabel}>BUSCAR EMPLEADO POR NOMBRE O CÉDULA</label>
            <input 
              type="text" 
              placeholder="Ej: Carlos Mendoza, V-26..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.filterBox}>
            <label style={styles.inputLabel}>FILTRAR POR CARGO</label>
            <select 
              value={filtroCargo} 
              onChange={(e) => setFiltroCargo(e.target.value)}
              style={styles.selectInput}
            >
              <option value="Todos">Todos los cargos</option>
              <option value="Supervisor de Patio">Supervisores</option>
              <option value="Operador Principal">Operadores Principales</option>
              <option value="Ayudante">Ayudantes</option>
            </select>
          </div>
        </div>

        {/* Grid de Tarjetas de Empleados */}
        <div style={styles.gridContainer}>
          {empleadosFiltrados.length > 0 ? (
            empleadosFiltrados.map((empleado) => (
              <div key={empleado.id} style={styles.employeeCard}>
                
                {/* Cabecera interna de la sub-tarjeta */}
                <div style={styles.employeeHeader}>
                  <div style={styles.avatarPlaceholder}>
                    {empleado.nombre.charAt(0)}{empleado.apellido.charAt(0)}
                  </div>
                  <div>
                    <h3 style={styles.employeeName}>{empleado.nombre} {empleado.apellido}</h3>
                    <span style={styles.employeeCedula}>{empleado.cedula}</span>
                  </div>
                </div>

                {/* Cuerpo de la sub-tarjeta con detalles técnicos */}
                <div style={styles.employeeBody}>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>CARGO:</span>
                    <span style={styles.infoValue}>{empleado.cargo}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>ESPECIALIDAD:</span>
                    <span style={styles.infoValueText}>{empleado.especialidad}</span>
                  </div>
                  <div style={styles.infoRow}>
                    <span style={styles.infoLabel}>ORDENES HOY:</span>
                    <span style={styles.ordersBadge}>{empleado.serviciosHoy} Atendidos</span>
                  </div>
                </div>

                {/* Estatus inferior dinámico */}
                <div style={styles.employeeFooter}>
                  <span style={{
                    ...styles.statusBadge,
                    ...styles[`status${empleado.estado}`]
                  }}>
                    ● {empleado.estado.toUpperCase()}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div style={styles.noData}>
              No se encontró personal registrado con los criterios seleccionados.
            </div>
          )}
        </div>

        {/* Botones de acción del pie idénticos a tu formulario */}
        <div style={styles.footerActions}>
          <button style={styles.btnSecondary} onClick={() => console.log('Atrás')}>
            VOLVER
          </button>
          <button style={styles.btnPrimary} onClick={() => alert('Abriendo formulario de nuevo operador...')}>
            REGISTRAR OPERADOR
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos unificados con la UI de GD Motors (image_01461b.png)
const styles = {
  container: {
    backgroundColor: '#0a0a0a', // Fondo negro profundo exterior
    minHeight: '100vh',
    padding: '30px 20px',
    fontFamily: 'sans-serif',
    color: '#fff',
  },
  breadcrumb: {
    fontSize: '14px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  hogarLink: {
    color: '#e53935', // Rojo acento corporativo
    cursor: 'pointer',
  },
  separator: {
    color: '#666',
    margin: '0 8px',
  },
  currentPath: {
    color: '#bbb',
  },
  card: {
    backgroundColor: '#dcdcdc', // Gris claro idéntico al bloque "Nueva Orden"
    borderRadius: '16px 16px 8px 8px',
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '25px',
    borderBottom: '1px solid #b8b8b8',
    paddingBottom: '15px',
  },
  redIndicator: {
    width: '5px',
    height: '26px',
    backgroundColor: '#e53935', // Línea vertical indicadora roja
    marginRight: '12px',
    borderRadius: '2px',
  },
  cardTitle: {
    color: '#1a1a1a', // Letras oscuras sobre fondo claro
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '0.5px',
  },
  filterSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '30px',
  },
  searchBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputLabel: {
    color: '#333',
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '8px',
    letterSpacing: '0.5px',
  },
  input: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #c8c8c8',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#1a1a1a',
    outline: 'none',
  },
  selectInput: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #c8c8c8',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#1a1a1a',
    outline: 'none',
    cursor: 'pointer',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
    marginBottom: '35px',
  },
  employeeCard: {
    backgroundColor: '#f5f5f5', // Contraste interno de sub-tarjeta
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
  },
  employeeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '12px',
    marginBottom: '12px',
  },
  avatarPlaceholder: {
    backgroundColor: '#1a1a1a', // Fondo oscuro para el mini avatar circular
    color: '#fff',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    letterSpacing: '1px',
    border: '2px solid #e53935', // Borde rojo acento estilo deportivo
  },
  employeeName: {
    color: '#000',
    margin: '0 0 2px 0',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  employeeCedula: {
    color: '#777',
    fontSize: '12px',
    fontFamily: 'monospace',
  },
  employeeBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontSize: '13px',
  },
  infoLabel: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: '11px',
  },
  infoValue: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  infoValueText: {
    color: '#444',
    textAlign: 'right',
    maxWidth: '180px',
    fontSize: '12.5px',
  },
  ordersBadge: {
    backgroundColor: '#eaeaea',
    color: '#333',
    padding: '2px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  employeeFooter: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '12px',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  statusDisponible: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  statusOcupado: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
  },
  statusAusente: {
    backgroundColor: '#ffebee',
    color: '#c62828',
  },
  noData: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
  },
  footerActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    borderTop: '1px solid #b8b8b8',
    paddingTop: '20px',
  },
  btnSecondary: {
    backgroundColor: '#6c7a89', // Gris oscuro del botón cancelar
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  },
  btnPrimary: {
    backgroundColor: '#2196f3', // Azul brillante del botón generar orden física
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default ListaEmpleados;