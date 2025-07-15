/**
 * Formatea un número agregando separadores de miles y dos decimales.
 * Por ejemplo: 1000 -> "1,000.00"
 *
 * @param {number | string} value El número a formatear.
 * @param {string} [locale='en-US'] El locale a usar para el formato (ej. 'es-ES' para España, 'en-US' para EE. UU.).
 * @param {number} [minimumFractionDigits=2] Número mínimo de dígitos decimales.
 * @param {number} [maximumFractionDigits=2] Número máximo de dígitos decimales.
 * @returns {string} El número formateado como string.
 */

export const formatNumber = (
  value: number | string,
  notation = true,
): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  // Si el número no es válido, devuelve un valor por defecto o un string vacío
  if (isNaN(num)) {
    return '0.00'; // O '' o '-' según prefieras
  }

  // --- Lógica para la notación 'B' ---
  if (notation && Math.abs(num) >= 1000000000000) {
    // Si el valor absoluto es 1,000,000 o más
    // Divide por 1000000000000 y añade 'B'
    // Usamos toFixed(1) para mantener un decimal, puedes ajustarlo si lo necesitas
    return (num / 1000000000000).toFixed(2) + 'B';
  }

  // --- Lógica para la notación 'MM' ---
  if (notation && Math.abs(num) >= 1000000000) {
    // Si el valor absoluto es 1,000,000 o más
    // Divide por 1000000000 y añade 'MM'
    // Usamos toFixed(1) para mantener un decimal, puedes ajustarlo si lo necesitas
    return (num / 1000000000).toFixed(2) + 'MM';
  }

  // --- Lógica para la notación 'M' ---
  if (notation && Math.abs(num) >= 1000000) {
    // Si el valor absoluto es 1,000,000 o más
    // Divide por 1000000 y añade 'M'
    // Usamos toFixed(1) para mantener un decimal, puedes ajustarlo si lo necesitas
    return (num / 1000000).toFixed(2) + 'M';
  }

  // --- Lógica para la notación 'k' ---
  if (notation && Math.abs(num) >= 100000) {
    // Si el valor absoluto es 100,000 o más
    // Divide por 1000 y añade 'k'
    // Usamos toFixed(1) para mantener un decimal, puedes ajustarlo si lo necesitas
    return (num / 1000).toFixed(2) + 'k';
  }
  // --- Fin de lógica para notación 'k' ---

  // Lógica original para números menores de 100,000
  // Para valores entre 0 y 99,999.99 (sin el .toFixed(2) original para evitar doble formateo)
  return num.toLocaleString('es-DO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true, // Esto añade los separadores de miles
  });
};
