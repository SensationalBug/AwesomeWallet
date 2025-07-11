export const themes = {
  light: {
    name: 'Claro',
    text: '#000',
    textLabel: '#60748A',
    background: '#fff',
    iconBackground: '#F0F2F5',
    barStyle: 'dark-content',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBorder: '#CCCCCC',
    chartBarColor: '#185dc4ff',
    chartBarNegativeColor: '#c7290dff',
  },
  dark: {
    name: 'Azul oscuro',
    text: '#fff',
    textLabel: '#60748A',
    background: '#101323',
    iconBackground: '#21284A',
    barStyle: 'light-content',
    modalBackdrop: 'rgba(0, 0, 0, 0.7)',
    modalBorder: '#444444',
    chartBarColor: '#00BFFF',
    chartBarNegativeColor: '#dd1f45ff',
  },
  blue: {
    name: 'Azul',
    text: '#E3F2FD', // Texto muy claro para fondos oscuros
    textLabel: '#90CAF9', // Un azul más claro para etiquetas
    background: '#1565C0', // Un azul oscuro y sólido como base
    iconBackground: '#2196F3', // Un azul brillante para iconos/elementos
    barStyle: 'light-content', // Contenido de barra claro
    modalBackdrop: 'rgba(0, 0, 0, 0.7)', // Fondo de modal oscuro
    modalBorder: '#64B5F6', // Borde de modal azul
    chartBarColor: '#00BCD4', // Un azul cian para barras positivas
    chartBarNegativeColor: '#EF5350', // Rojo vibrante para lo negativo
  },
  green: {
    name: 'Verde',
    text: '#E0FFEB', // Texto claro para fondos oscuros/medios
    textLabel: '#c3ef91ff', // Un verde más claro para etiquetas
    background: '#2E7D32', // Un verde oscuro y profundo como base
    iconBackground: '#4CAF50', // Un verde medio para iconos/elementos interactivos
    barStyle: 'light-content', // Contenido de barra claro para fondo oscuro
    modalBackdrop: 'rgba(0, 0, 0, 0.7)', // Fondo de modal oscuro
    modalBorder: '#66BB6A', // Borde de modal verde
    chartBarColor: '#5deb4bff', // Un verde más vibrante para barras positivas
    chartBarNegativeColor: '#FF5722', // Naranja/rojo para contrastar lo negativo
  },
  black: {
    name: 'Oscuro',
    text: '#F5F5F5', // Blanco casi puro para texto
    textLabel: '#AAAAAA', // Gris claro para etiquetas, buena legibilidad
    background: '#000000', // Negro puro para el fondo principal
    iconBackground: '#1C1C1C', // Gris muy oscuro para el fondo de iconos/elementos, sutil contraste
    barStyle: 'light-content', // Contenido de barra claro
    modalBackdrop: 'rgba(0, 0, 0, 0.8)', // Fondo de modal muy oscuro
    modalBorder: '#333333', // Borde gris oscuro para el modal
    chartBarColor: '#1e7b0dff', // Verde neón para barras positivas (contrasta bien en negro)
    chartBarNegativeColor: '#b81818ff', // Rosa/rojo brillante para lo negativo
  },
};
