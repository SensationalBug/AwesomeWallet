import {createContext, useContext, useState} from 'react';
import {ReportsContext} from './ReportsContext';
import RNFetchBlob from 'react-native-blob-util';
import {Share} from 'react-native';
import {showToast} from '../utils/toastAlert';

/**
 * Exporta todas las transacciones a un archivo CSV y permite compartirlas.
 * @param {string} fileName El nombre base del archivo CSV (ej. "transacciones").
 * @returns {Promise<void>} Una promesa que se resuelve cuando la exportación y el compartir han terminado.
 */

type ExportContextType = {
  exportFormat: string;
  setExportFormat: React.Dispatch<React.SetStateAction<string>>;
  exportToCSV: () => void;
};

export const ExportContext = createContext<ExportContextType>({
  exportFormat: '',
  setExportFormat: () => {},
  exportToCSV: () => {},
});

export const ExportProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {globalTransactions} = useContext(ReportsContext);
  const [exportFormat, setExportFormat] = useState<string>('');

  // const requestStoragePermission = async () => {
  //   if (Platform.OS !== 'android') {
  //     return;
  //   }

  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: 'Permiso de Almacenamiento',
  //         message:
  //           'Esta aplicacion necesita permiso para guardar los documentos exportados.',
  //         buttonNeutral: 'Preguntar mas tarde',
  //         buttonNegative: 'Cancelar',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('Permiso otorgado', PermissionsAndroid.RESULTS.GRANTED);
  //       return true;
  //     } else {
  //       console.log('Permiso denegado', PermissionsAndroid.RESULTS.DENIED);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  const exportToCSV = async (fileName: string = 'Transacciones') => {
    // const hasPermission = await requestStoragePermission();
    // if (!hasPermission) {
    //   return;
    // }

    try {
      if (!globalTransactions || globalTransactions.transactions.length === 0) {
        showToast('error', 'No hay transacciones para exportar');
        return;
      }
      const headers = ['ID', 'Nombre', 'Monto', 'Categoria', 'Tipo', 'Fecha'];
      const csvRows = globalTransactions.transactions.map((tx: any) => {
        const id = tx._id ? String(tx._id) : '';
        const name = tx.concept ? tx.concept.replace(/"/g, '""') : '';
        const amount = tx.amount !== undefined ? tx.amount.toFixed(2) : '0.00';
        const type = tx.type || '';
        const date = tx.cDate ? tx.cDate.toString().split('T')[0] : '';

        return [`"${id}"`, `"${name}"`, amount, `"${type}"`, date].join(',');
      });

      const csvString = [headers.join(','), ...csvRows].join('\n');

      const finalName = `${fileName}_${globalTransactions.sortKey}.csv`;

      const filePath = await RNFetchBlob.fs.createFile(
        finalName,
        csvString,
        'utf8',
      );

      console.log(`Archivo generado en: ${filePath}`);

      // const dirs = RNFetchBlob.fs.dirs;
      // const path = `${dirs.DocumentDir}/${fileName}_${globalTransactions.sortKey}.csv`;

      // const fileUri = `file://${path}`;

      await Share.share({
        title: 'Exportar transacciones',
        message: 'Aqui estan tus transacciones',
        url: `file://${filePath}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExportContext.Provider
      value={{
        exportFormat,
        setExportFormat,
        exportToCSV,
      }}>
      {children}
    </ExportContext.Provider>
  );
};
