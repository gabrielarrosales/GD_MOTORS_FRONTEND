import React, { useState, useEffect } from 'react';

const TasaDelDia = () => {
  // Estado para almacenar el valor de la tasa (puedes conectarlo a una API más tarde)
    const [tasa, setTasa] = useState(36.50); 
    const [ultimaActualizacion, setUltimaActualizacion] = useState('');

    useEffect(() => {
        // Simulación de fecha de actualización actual
        const fecha = new Date().toLocaleDateString('es-VE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
        });
        setUltimaActualizacion(fecha);
    }, []);

    return (
        <div style={styles.container}>
        {/* Encabezado de navegación/migas de pan similar al tuyo */}
        <div style={styles.breadcrumb}>
            <span style={styles.hogarLink}>Hogar</span> <span style={styles.separator}>/</span> <span style={styles.currentPath}>Tasa del Día</span>
        </div>

        {/* Tarjeta Principal */}
        <div style={styles.card}>
            <div style={styles.cardHeader}>
            <div style={styles.redIndicator}></div>
            <h2 style={styles.cardTitle}>TASA OFICIAL DEL DÍA (BCV)</h2>
            </div>

            <div style={styles.cardBody}>
            <div style={styles.tasaWrapper}>
                <span style={styles.currencyLabel}>1 USD =</span>
                <span style={styles.tasaValue}>{tasa.toFixed(2)}</span>
                <span style={styles.currencyBs}>Bs.</span>
            </div>

            <p style={styles.updateText}>
                <strong>Última actualización:</strong> {ultimaActualizacion}
            </p>

            {/* Acciones del sistema */}
            <div style={styles.buttonContainer}>
                <button style={styles.btnSecondary} onClick={() => console.log('Cancelar')}>
                VOLVER
                </button>
                <button style={styles.btnPrimary} onClick={() => alert('Tasa actualizada')}>
                ACTUALIZAR TASA
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    };

    // Estilos en línea basados exactamente en tu paleta de colores de la captura
    const styles = {
    container: {
        backgroundColor: '#0a0a0a', // Fondo oscuro profundo de tu app
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'sans-serif',
        color: '#fff',
    },
    breadcrumb: {
        fontSize: '14px',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    hogarLink: {
        color: '#e53935', // Rojo de tu menú/navegación
        cursor: 'pointer',
    },
    separator: {
        color: '#666',
        margin: '0 5px',
    },
    currentPath: {
        color: '#fff',
    },
    card: {
        backgroundColor: '#dcdcdc', // Gris claro idéntico al contenedor "Nueva Orden"
        borderRadius: '16px 16px 4px 4px', // Bordes superiores más redondeados como tu diseño
        padding: '24px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
        borderBottom: '1px solid #c0c0c0',
        paddingBottom: '10px',
    },
    redIndicator: {
        width: '4px',
        height: '24px',
        backgroundColor: '#e53935', // Línea vertical roja antes de los títulos
        marginRight: '10px',
        borderRadius: '2px',
    },
    cardTitle: {
        color: '#000', // Texto oscuro para contrastar con el fondo claro de la tarjeta
        fontSize: '18px',
        fontWeight: 'bold',
        margin: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px 0',
    },
    tasaWrapper: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', // Fondo del input/display de datos
        padding: '20px 40px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
        marginBottom: '15px',
        border: '1px solid #ccc',
    },
    currencyLabel: {
        fontSize: '20px',
        color: '#555',
        marginRight: '10px',
        fontWeight: '500',
    },
    tasaValue: {
        fontSize: '42px',
        fontWeight: 'bold',
        color: '#000',
    },
    currencyBs: {
        fontSize: '24px',
        color: '#e53935', // Detalle en rojo para la moneda local
        marginLeft: '8px',
        fontWeight: 'bold',
    },
    updateText: {
        color: '#444',
        fontSize: '13px',
        marginBottom: '30px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        width: '100%',
        marginTop: '10px',
    },
    btnSecondary: {
        backgroundColor: '#6c7a89', // Gris azulado del botón CANCELAR
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },
    btnPrimary: {
        backgroundColor: '#2196f3', // Azul brillante del botón GENERAR ORDEN FÍSICA
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s',
    },
};

export default TasaDelDia;