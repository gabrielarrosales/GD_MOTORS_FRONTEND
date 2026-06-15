import React, { useState } from 'react';

const ListaServicios = () => {
  // Estado para la tasa del día (conectado conceptualmente con tu otra página)
  const [tasaDolar, setTasaDolar] = useState(36.50);
  
  // Categoría seleccionada para filtrar
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  
  // Filtro de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Lista de servicios de autolavado
  const [servicios, setServicios] = useState([
    { id: 1, nombre: 'Lavado Exprés', descripcion: 'Lavado exterior con champú con cera, secado a mano, limpieza de vidrios exteriores y aplicación de silicona en neumáticos.', categoria: 'Básico', precioUSD: 10, duracion: '20 min' },
    { id: 2, nombre: 'Lavado Completo', descripcion: 'Lavado exterior e interior completo. Aspirado de alfombras y asientos, limpieza de tablero, puertas y maleta.', categoria: 'Básico', precioUSD: 15, duracion: '45 min' },
    { id: 3, nombre: 'Lavado de Motor', descripcion: 'Desengrasado profundo de motor con vapor a alta presión y protector dieléctrico para componentes eléctricos.', categoria: 'Especial', precioUSD: 25, duracion: '40 min' },
    { id: 4, nombre: 'Lavado de Chasis', descripcion: 'Remoción de barro, salitre y grasa acumulada en la parte inferior del vehículo con puente elevador y anticorrosivo.', categoria: 'Especial', precioUSD: 20, duracion: '30 min' },
    { id: 5, nombre: 'Pulitura y Encerado', descripcion: 'Descontaminado de pintura, eliminación de micro-rayas (Swirls) con máquina orbital y sellado con cera de carnauba premium.', categoria: 'Premium', precioUSD: 60, duracion: '3 horas' },
    { id: 6, nombre: 'Lavado de Tapicería', descripcion: 'Limpieza profunda e higienización de asientos (cuero o tela), alfombras, techo y paneles de puertas con máquina de inyección-extracción.', categoria: 'Premium', precioUSD: 80, duracion: '4 horas' },
    { id: 7, nombre: 'Restauración de Faros', descripcion: 'Lijado al agua de faros opacos o amarillentos y aplicación de polímero líquido para devolver la transparencia original.', categoria: 'Especial', precioUSD: 15, duracion: '1 hora' },
    { id: 8, nombre: 'Tratamiento Cerámico 9H', descripcion: 'Recubrimiento cerámico de alta gama para protección de pintura contra rayos UV, lluvia ácida y rayones ligeros. Brillo extremo.', categoria: 'Premium', precioUSD: 150, duracion: '8 horas' },
  ]);

  // Filtrar servicios por categoría y búsqueda
  const serviciosFiltrados = servicios.filter(servicio => {
    const coincideCategoria = categoriaActiva === 'Todos' || servicio.categoria === categoriaActiva;
    const coincideBusqueda = servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                             servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  return (
    <div style={styles.container}>
      {/* Barra de Navegación superior / Breadcrumbs igual a tu captura image_01461b.png */}
      <div style={styles.breadcrumb}>
        <span style={styles.hogarLink}>Hogar</span> 
        <span style={styles.separator}>/</span> 
        <span style={styles.currentPath}>Servicios</span>
        <span style={styles.separator}>/</span> 
        <span style={styles.currentPath}>Catálogo de Precios</span>
      </div>

      {/* Tarjeta Contenedor Principal (Gris claro de tu UI) */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.redIndicator}></div>
          <h2 style={styles.cardTitle}>CATÁLOGO DE SERVICIOS - GD MOTORS WASH</h2>
        </div>

        {/* Sección de Filtros y Configuración Rápida */}
        <div style={styles.filterSection}>
          <div style={styles.searchBox}>
            <label style={styles.inputLabel}>BUSCAR SERVICIO</label>
            <input 
              type="text" 
              placeholder="Ej: Pulitura, Tapicería..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.tasaBox}>
            <label style={styles.inputLabel}>TASA DE CAMBIO (Bs.)</label>
            <div style={styles.tasaInputWrapper}>
              <span style={styles.dollarSymbol}>$</span>
              <input 
                type="number" 
                value={tasaDolar} 
                onChange={(e) => setTasaDolar(parseFloat(e.target.value) || 0)}
                style={styles.tasaInput}
              />
            </div>
          </div>
        </div>

        {/* Pestañas de Categorías con estilo de botones redondos */}
        <div style={styles.tabsContainer}>
          {['Todos', 'Básico', 'Especial', 'Premium'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                ...styles.tabButton,
                ...(categoriaActiva === cat ? styles.tabButtonActive : {})
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Lista de Servicios en formato Tabla / Tarjetas Flexibles */}
        <div style={styles.servicesGrid}>
          {serviciosFiltrados.length > 0 ? (
            serviciosFiltrados.map((servicio) => (
              <div key={servicio.id} style={styles.serviceItem}>
                <div style={styles.serviceMainInfo}>
                  <div style={styles.categoryBadgeWrapper}>
                    <span style={{
                      ...styles.categoryBadge,
                      ...styles[`badge${servicio.categoria}`]
                    }}>
                      {servicio.categoria}
                    </span>
                    <span style={styles.duration}>
                      <i className="fa-regular fa-clock" style={{ marginRight: '5px' }}></i> {servicio.duracion}
                    </span>
                  </div>
                  <h3 style={styles.serviceName}>{servicio.nombre}</h3>
                  <p style={styles.serviceDesc}>{servicio.descripcion}</p>
                </div>

                <div style={styles.priceContainer}>
                  <div style={styles.priceUSD}>
                    <span style={styles.priceLabel}>PRECIO USD</span>
                    <span style={styles.priceValueUSD}>${servicio.precioUSD}</span>
                  </div>
                  <div style={styles.priceBS}>
                    <span style={styles.priceLabel}>PRECIO BS (TASA {tasaDolar})</span>
                    <span style={styles.priceValueBS}>Bs. {(servicio.precioUSD * tasaDolar).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>
              No se encontraron servicios que coincidan con la búsqueda.
            </div>
          )}
        </div>

        {/* Acciones de pie de página idénticas a tu diseño */}
        <div style={styles.footerActions}>
          <button style={styles.btnSecondary} onClick={() => console.log('Atrás')}>
            VOLVER
          </button>
          <button style={styles.btnPrimary} onClick={() => alert('Abriendo formulario de nuevo servicio...')}>
            NUEVO SERVICIO
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos alineados con la imagen de referencia (image_01461b.png)
const styles = {
  container: {
    backgroundColor: '#0a0a0a', // Fondo negro de tu aplicación exterior
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
    color: '#e53935', // Rojo corporativo
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
    backgroundColor: '#dcdcdc', // Gris claro idéntico a "Nueva Orden"
    borderRadius: '16px 16px 8px 8px',
    padding: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '1px solid #b8b8b8',
    paddingBottom: '15px',
  },
  redIndicator: {
    width: '5px',
    height: '26px',
    backgroundColor: '#e53935', // Línea de acento roja
    marginRight: '12px',
    borderRadius: '2px',
  },
  cardTitle: {
    color: '#1a1a1a', // Texto oscuro del título
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
  tasaBox: {
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
    backgroundColor: '#f5f5f5', // Fondo blanco/gris claro del input
    border: '1px solid #c8c8c8',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '15px',
    color: '#1a1a1a',
    outline: 'none',
  },
  tasaInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    border: '1px solid #c8c8c8',
    borderRadius: '10px',
    paddingLeft: '14px',
  },
  dollarSymbol: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  tasaInput: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '12px 10px',
    fontSize: '15px',
    color: '#1a1a1a',
    outline: 'none',
    width: '100%',
  },
  tabsContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '1px solid #c8c8c8',
    paddingBottom: '15px',
  },
  tabButton: {
    backgroundColor: '#c8c8c8',
    color: '#1a1a1a',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabButtonActive: {
    backgroundColor: '#e53935', // Rojo activo de tu botón "Nueva Orden"
    color: '#fff',
  },
  servicesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '35px',
    maxHeight: '500px',
    overflowY: 'auto',
    paddingRight: '5px',
  },
  serviceItem: {
    backgroundColor: '#f5f5f5', // Color interno de tarjeta para contraste
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform 0.2s',
  },
  serviceMainInfo: {
    flex: '1',
    paddingRight: '20px',
  },
  categoryBadgeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  categoryBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  badgeBásico: {
    backgroundColor: '#e3f2fd',
    color: '#1e88e5',
  },
  badgeEspecial: {
    backgroundColor: '#efebe9',
    color: '#6d4c41',
  },
  badgePremium: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
  },
  duration: {
    fontSize: '12px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
  },
  serviceName: {
    color: '#1a1a1a',
    margin: '0 0 6px 0',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  serviceDesc: {
    color: '#555',
    margin: 0,
    fontSize: '13.5px',
    lineHeight: '1.4',
  },
  priceContainer: {
    textAlign: 'right',
    minWidth: '200px',
    borderLeft: '1px solid #e0e0e0',
    paddingLeft: '20px',
  },
  priceUSD: {
    marginBottom: '10px',
  },
  priceBS: {
    marginTop: '5px',
  },
  priceLabel: {
    display: 'block',
    fontSize: '10px',
    color: '#777',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  priceValueUSD: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  priceValueBS: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#e53935', // Rojo para el precio nacional
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '15px',
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
    backgroundColor: '#6c7a89', // Gris oscuro del botón cancelar de tu panel
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  btnPrimary: {
    backgroundColor: '#2196f3', // Azul rey idéntico al botón de Generar Orden Física
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
};

export default ListaServicios;