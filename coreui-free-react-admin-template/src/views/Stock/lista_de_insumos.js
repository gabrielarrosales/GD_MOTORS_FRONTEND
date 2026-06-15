import React, { useState } from 'react';

const InventarioInsumos = () => {
  // Filtros de la UI
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  // Datos de los insumos del autolavado
  const [insumos, setInsumos] = useState([
    { id: 1, codigo: 'INS-001', nombre: 'Champú con Cera Concentrado', categoria: 'Químicos de Lavado', stockActual: 45, stockMinimo: 15, unidad: 'Litros', ubicacion: 'Estante A' },
    { id: 2, codigo: 'INS-002', nombre: 'Desengrasante de Motor Premium', categoria: 'Químicos de Lavado', stockActual: 8, stockMinimo: 12, unidad: 'Litros', ubicacion: 'Estante A' }, // Bajo Stock
    { id: 3, codigo: 'INS-003', nombre: 'Silicona Líquida para Neumáticos', categoria: 'Acabado y Brillo', stockActual: 22, stockMinimo: 10, unidad: 'Litros', ubicacion: 'Estante B' },
    { id: 4, codigo: 'INS-004', nombre: 'Cera de Carnauba en Pasta', categoria: 'Acabado y Brillo', stockActual: 3, stockMinimo: 5, unidad: 'Unidades', ubicacion: 'Estante B' }, // Bajo Stock
    { id: 5, codigo: 'INS-005', nombre: 'Paños de Microfibra 40x40', categoria: 'Herramientas', stockActual: 60, stockMinimo: 20, unidad: 'Unidades', ubicacion: 'Gaveta 1' },
    { id: 6, codigo: 'INS-006', nombre: 'Limpia Vidrios Antiempañante', categoria: 'Químicos de Lavado', stockActual: 18, stockMinimo: 8, unidad: 'Litros', ubicacion: 'Estante A' },
    { id: 7, codigo: 'INS-007', nombre: 'Ambientador Líquido (Fragancia Carro Nuevo)', categoria: 'Acabado y Brillo', stockActual: 2, stockMinimo: 6, unidad: 'Litros', ubicacion: 'Estante B' }, // Bajo Stock
    { id: 8, codigo: 'INS-008', nombre: 'Cepillos de Cerda Suave para Rin', categoria: 'Herramientas', stockActual: 12, stockMinimo: 4, unidad: 'Unidades', ubicacion: 'Gaveta 2' },
  ]);

  // Filtrado lógico de insumos
  const insumosFiltrados = insumos.filter(insumo => {
    const coincideBusqueda = insumo.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             insumo.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                             insumo.categoria.toLowerCase().includes(busqueda.toLowerCase());
    
    const estaBajoStock = insumo.stockActual <= insumo.stockMinimo;
    
    if (filtroEstado === 'Bajo Stock') return coincideBusqueda && estaBajoStock;
    if (filtroEstado === 'Normal') return coincideBusqueda && !estaBajoStock;
    return coincideBusqueda;
  });

  return (
    <div style={styles.container}>
      {/* Breadcrumbs superiores copiando la jerarquía de tu UI */}
      <div style={styles.breadcrumb}>
        <span style={styles.hogarLink}>Hogar</span> 
        <span style={styles.separator}>/</span> 
        <span style={styles.currentPath}>Administración</span>
        <span style={styles.separator}>/</span> 
        <span style={styles.currentPath}>Inventario</span>
      </div>

      {/* Panel Contenedor Principal (Gris claro #dcdcdc de tu UI) */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.redIndicator}></div>
          <h2 style={styles.cardTitle}>CONTROL DE STOCK DE INSUMOS</h2>
        </div>

        {/* Bloque de Búsqueda y Filtros de Estado */}
        <div style={styles.filterSection}>
          <div style={styles.searchBox}>
            <label style={styles.inputLabel}>BUSCAR INSUMO O CÓDIGO</label>
            <input 
              type="text" 
              placeholder="Ej: Champú, INS-002, Microfibra..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.filterBox}>
            <label style={styles.inputLabel}>ESTADO DEL STOCK</label>
            <select 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value)}
              style={styles.selectInput}
            >
              <option value="Todos">Todos los insumos</option>
              <option value="Bajo Stock">⚠️ Bajo Stock (Requerido Ordenar)</option>
              <option value="Normal">✔️ Stock Estable</option>
            </select>
          </div>
        </div>

        {/* Tabla de Datos de Inventario */}
        <div style={styles.tableResponsive}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>CÓDIGO</th>
                <th style={styles.th}>INSUMO</th>
                <th style={styles.th}>CATEGORÍA</th>
                <th style={styles.th}>UBICACIÓN</th>
                <th style={styles.thCenter}>CANTIDAD</th>
                <th style={styles.thCenter}>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {insumosFiltrados.length > 0 ? (
                insumosFiltrados.map((insumo) => {
                  const bajoStock = insumo.stockActual <= insumo.stockMinimo;
                  return (
                    <tr key={insumo.id} style={styles.tr}>
                      <td style={styles.tdCode}>{insumo.codigo}</td>
                      <td style={styles.tdName}>
                        <strong>{insumo.nombre}</strong>
                      </td>
                      <td style={styles.td}>{insumo.categoria}</td>
                      <td style={styles.td}>{insumo.ubicacion}</td>
                      <td style={styles.tdCenter}>
                        <span style={styles.stockQuantity}>
                          {insumo.stockActual} {insumo.unidad}
                        </span>
                        <span style={styles.stockMinLabel}>Min: {insumo.stockMinimo}</span>
                      </td>
                      <td style={styles.tdCenter}>
                        {bajoStock ? (
                          <span style={styles.badgeDanger}>BAJO STOCK</span>
                        ) : (
                          <span style={styles.badgeSuccess}>ESTABLE</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={styles.noData}>
                    No hay registros de insumos que coincidan con los criterios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botones de acción del pie de la tarjeta */}
        <div style={styles.footerActions}>
          <button style={styles.btnSecondary} onClick={() => console.log('Cancelar')}>
            VOLVER
          </button>
          <button style={styles.btnPrimary} onClick={() => alert('Abriendo formulario para registrar entrada/ajuste...')}>
            REGISTRAR ENTRADA
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos sincronizados exactamente con image_01461b.png
const styles = {
  container: {
    backgroundColor: '#0a0a0a', // Fondo negro exterior
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
    color: '#e53935', // Rojo acento del sistema
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
    backgroundColor: '#dcdcdc', // Color gris claro de tus formularios
    borderRadius: '16px 16px 8px 8px', // Mismo radio de esquinas
    padding: '30px',
    maxWidth: '1150px',
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
    color: '#1a1a1a', // Letras oscuras en contenedores claros
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    letterSpacing: '0.5px',
  },
  filterSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '25px',
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
    backgroundColor: '#f5f5f5', // Entradas claras y limpias
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
  tableResponsive: {
    width: '100%',
    overflowX: 'auto',
    backgroundColor: '#f5f5f5', // Fondo del cuerpo de la tabla para contraste
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px',
    color: '#1a1a1a',
  },
  thRow: {
    backgroundColor: '#eaeaea',
    borderBottom: '2px solid #c8c8c8',
  },
  th: {
    padding: '15px 18px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '12px',
    letterSpacing: '0.5px',
  },
  thCenter: {
    padding: '15px 18px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '12px',
    letterSpacing: '0.5px',
    textAlign: 'center',
  },
  tr: {
    borderBottom: '1px solid #e0e0e0',
    transition: 'background-color 0.2s',
  },
  td: {
    padding: '14px 18px',
    color: '#444',
  },
  tdCode: {
    padding: '14px 18px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    color: '#555',
    fontSize: '13px',
  },
  tdName: {
    padding: '14px 18px',
    color: '#000',
  },
  tdCenter: {
    padding: '14px 18px',
    textAlign: 'center',
  },
  stockQuantity: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  stockMinLabel: {
    display: 'block',
    fontSize: '11px',
    color: '#777',
    marginTop: '2px',
  },
  badgeSuccess: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
  },
  badgeDanger: {
    backgroundColor: '#ffebee',
    color: '#c62828', // Variación oscura del rojo para legibilidad de alertas
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
    border: '1px solid #ffcdd2',
  },
  noData: {
    padding: '30px',
    textAlign: 'center',
    color: '#666',
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

export default InventarioInsumos;