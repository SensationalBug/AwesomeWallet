export const themes = {
  light: {
    name: 'Claro',
    text: '#000',
    textLabel: '#60748A',
    background: '#fff',
    iconBackground: '#F0F2F5',
    transactionTypeDebit: '#FF3B30',
    transactionTypeCredit: '#34C759',
    barStyle: 'dark-content',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBorder: '#CCCCCC',
    chartBarColor: '#ADD8E6', // Light Blue
    chartBarNegativeColor: '#FF6347', // Tomato - un rojo vibrante para el tema claro
  },
  dark: {
    name: 'Oscuro',
    text: '#fff',
    textLabel: '#60748A',
    background: '#101323', // Tu fondo oscuro
    iconBackground: '#21284A',
    transactionTypeDebit: '#FF3B30',
    transactionTypeCredit: '#34C759',
    barStyle: 'light-content',
    modalBackdrop: 'rgba(0, 0, 0, 0.7)',
    modalBorder: '#444444',
    chartBarColor: '#00BFFF', // Deep Sky Blue - es brillante y contrasta mucho
    chartBarNegativeColor: '#DC143C', // Crimson - un rojo más oscuro para el tema oscuro
  },
  blue: {
    name: 'Azul',
    text: '#FFFFFF',
    textLabel: '#D1E7FF',
    background: '#007AFF',
    iconBackground: '#A8D0F0',
    transactionTypeDebit: '#FF3B30',
    transactionTypeCredit: '#34C759',
    barStyle: 'light-content',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBorder: '#004C99',
    chartBarColor: '#33CCFF', // Sky Blue / Capri
    chartBarNegativeColor: '#FF4500', // OrangeRed - un rojo anaranjado para el tema azul
  },
  green: {
    name: 'Verde',
    text: '#FFFFFF',
    textLabel: '#D4F0DC',
    background: '#34C759',
    iconBackground: '#AEE5BB',
    transactionTypeDebit: '#FF3B30',
    transactionTypeCredit: '#34C759',
    barStyle: 'light-content',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBorder: '#1E7B38',
    chartBarColor: '#7CFC00', // Lawn Green
    chartBarNegativeColor: '#CC0000', // Un rojo más oscuro y saturado para el tema verde
  },
};
