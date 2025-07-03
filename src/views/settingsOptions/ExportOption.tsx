import {FAB} from 'react-native-paper';
import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ThemeType} from '../../types/Types';
import {StyleSheet, View} from 'react-native';
import {ThemesContext} from '../../context/ThemesContext';
import {ExportContext} from '../../context/ExportContext';
import StyledView from '../../components/custom/StyledView';
import StyledText from '../../components/custom/StyledText';
import HeaderDropdown from '../../components/HeaderDropdown';
import {ReportsContext} from '../../context/ReportsContext';

const ExportOption = () => {
  const {selectedTransactionValue} = useContext(ReportsContext);
  const {exportFormat, setExportFormat, exportToCSV} =
    useContext(ExportContext);
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  return (
    <StyledView style={styles.container}>
      <StyledText text="Formato a exportar" variant="headlineMedium" />
      <View style={styles.FABContainer}>
        <FAB
          label="CSV"
          color={theme.text}
          onPress={() => setExportFormat('CSV')}
          style={[
            styles.FAB,
            {
              backgroundColor: theme.chartBarColor,
              // Esto se descomenta cuando se agregue la funcion para exportar a PDF
              // exportFormat === 'CSV'
              //   ? theme.chartBarColor
              //   : theme.iconBackground,
            },
          ]}
        />
        <FAB
          disabled
          label={'PDF'}
          color={theme.text}
          onPress={() => setExportFormat('PDF')}
          style={[
            styles.FAB,
            {
              backgroundColor:
                exportFormat === 'PDF'
                  ? theme.chartBarColor
                  : theme.iconBackground,
            },
          ]}
        />
      </View>
      <StyledText text="Rango de fecha" variant="headlineMedium" />
      <HeaderDropdown />
      <FAB
        label="Exportar"
        color={theme.text}
        onPress={() => exportToCSV()}
        disabled={!selectedTransactionValue ? true : false}
        style={[styles.exportButton, {backgroundColor: theme.iconBackground}]}
      />
    </StyledView>
  );
};

export default ExportOption;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  FABContainer: {
    flexDirection: 'row',
  },
  FAB: {
    margin: 15,
  },
  exportButton: {
    marginVertical: 10,
  },
});
