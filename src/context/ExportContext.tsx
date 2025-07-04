import RNFS from 'react-native-fs';
import {Platform} from 'react-native';
import Share from 'react-native-share';
import {showToast} from '../utils/toastAlert';
import {ReportsContext} from './ReportsContext';
import {formatNumber} from '../utils/formatNumber';
import { ExportContextType } from '../types/Types';
import {CategoriesContext} from './CategoriesContext';
import {createContext, useContext, useState} from 'react';

/**
 * Exporta todas las transacciones a un archivo CSV y permite compartirlas.
 * @param {string} fileName El nombre base del archivo CSV (ej. "transacciones").
 * @returns {Promise<void>} Una promesa que se resuelve cuando la exportación y el compartir han terminado.
 */

export const ExportContext = createContext<ExportContextType>({
  exportFormat: '',
  setExportFormat: () => {},
  exportToCSV: () => {},
});

export const ExportProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {globalTransactions} = useContext(ReportsContext);
  const {getCategoryById} = useContext(CategoriesContext);
  const [exportFormat, setExportFormat] = useState<string>('');

  const exportToCSV = async () => {
    try {
      if (!globalTransactions || globalTransactions.transactions.length === 0) {
        showToast('error', 'No hay transacciones para exportar');
        return;
      }

      const headers = ['ID', 'Nombre', 'Monto', 'Categoria', 'Tipo', 'Fecha'];
      const csvRows = globalTransactions.transactions.map((tx: any) => {
        const id = tx._id ? String(tx._id) : '';
        const name = tx.concept ? tx.concept.replace(/"/g, '""') : '';
        const amount = tx.amount !== undefined ? tx.amount : '0.00';
        const category = tx.category ? getCategoryById(tx.category) : null;
        const type = tx.type || '';
        const date = tx.cDate ? tx.cDate.toString().split('T')[0] : '';
        return [
          `"${id}"`,
          `"${name}"`,
          `"${formatNumber(amount)}"`,
          `"${
            category &&
            typeof category === 'object' &&
            (category as {name?: string}).name
              ? (category as {name?: string}).name
              : ''
          }"`,
          `"${type}"`,
          date,
        ].join(',');
      });

      const csvString = [headers.join(','), ...csvRows].join('\n');
      const finalName = `Transacciones_${globalTransactions.sortKey}.csv`;

      if (Platform.OS === 'android') {
        try {
          const tempFile = `${RNFS.DocumentDirectoryPath}/${finalName}`;
          console.log(tempFile);
          await RNFS.writeFile(tempFile, csvString, 'utf8');

          console.log(`Archivo CSV guarado en: ${tempFile}`);

          await Share.open({
            title: 'Exportar transacciones',
            message: 'Aqui estan tus transacciones',
            url: `file://${tempFile}`,
            type: 'text/csv',
          });

          console.log('Export finalizado');
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExportContext.Provider
      value={{
        exportToCSV,
        exportFormat,
        setExportFormat,
      }}>
      {children}
    </ExportContext.Provider>
  );
};
