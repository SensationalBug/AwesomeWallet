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
  locale: string = 'en-US', // Por defecto a 'en-US' (separador de miles con coma, decimal con punto)
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
): string => {
  // Asegúrate de que el valor sea un número antes de formatearlo
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  // Si el valor no es un número válido, devuelve un string vacío o un valor por defecto
  if (isNaN(numValue as number)) {
    return ''; // O podrías devolver "0.00" o "N/A"
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(numValue as number);
};
