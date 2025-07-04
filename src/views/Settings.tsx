import React, {useContext} from 'react';
import {Switch} from 'react-native-paper';
import Section from '../components/custom/Section';
import {useNavigation} from '@react-navigation/native';
import {ThemesContext} from '../context/ThemesContext';
import StyledButton from '../components/custom/StyledButton';
import {View, StyleSheet, Linking, Alert} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {themes} from '../styles/Theme';
import {Transaction} from '../db/schemas';
import {BiometryContext} from '../context/BiometryContext';
import {SettingsStackParamList, ThemeType} from '../types/Types';
import StyledDropDown from '../components/custom/StyledDropDown';
import {TransactionContext} from '../context/TransactionContext';

const Settings = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const {isBiometryActive, enableBiometry} = useContext(BiometryContext);
  const {currency, currencySetter} = useContext(TransactionContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const currencies = [
    {label: 'RD$', value: 'RD'},
    {label: 'US$', value: 'US'},
  ];

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Section title="Cuenta" />
      <StyledButton
        iconName="list-ul"
        title="Categorias"
        subTitle="Administrar las categorias de transacciones"
        onPress={() => navigation.navigate('CategoriesOption')}
      />
      <StyledButton
        iconName="fingerprint"
        title="Huella"
        subTitle="Administrar las configuraciones de huella"
        onPress={() => enableBiometry()}
        children={
          <Switch
            color={theme.chartBarColor}
            value={isBiometryActive}
            onValueChange={() => enableBiometry()}
          />
        }
      />
      <Section title="Personalizacion" />
      <StyledButton
        iconName="sun"
        title="Tema y colores"
        subTitle="Cambiar tema y colores"
        onPress={() => navigation.navigate('ThemesOption')}
      />
      <StyledButton
        disabled
        iconName="dollar-sign"
        title="Tipo de moneda"
        subTitle="Administrar los tipos de moneda"
        children={
          <StyledDropDown
            placeholder=""
            width={'25%'}
            value={currency}
            data={currencies}
            onChange={elem => {
              currencySetter(elem.value);
            }}
          />
        }
      />
      <Section title="Soporte y Ayuda" />
      <StyledButton
        iconName="external-link-alt"
        title="Exportar"
        subTitle="Exportar datos (csv, pdf)"
        onPress={() => navigation.navigate('ExportOption')}
      />
      <StyledButton
        iconName="question"
        title="Centro de ayuda"
        subTitle="Preguntas frecuentes y soporte técnico"
        onPress={() => {
          Alert.alert(
            'Salir de la app',
            'Saldras de la app para ver las preguntas frecuentes.',
            [
              {text: 'Cancelar'},
              {
                text: 'Si, salir',
                onPress: () => Linking.openURL('https://www.google.com'),
              },
            ],
          );
        }}
      />
      <StyledButton
        iconName="info"
        title="Acerca de"
        subTitle="Política de privacidad y términos de uso"
        onPress={() => {
          Alert.alert(
            'Salir de la app',
            'Saldras de la app para ver las políticas de privacidad y terminos de uso.',
            [
              {text: 'Cancelar'},
              {
                text: 'Si, salir',
                onPress: () =>
                  Linking.openURL(
                    'https://github.com/SensationalBug/AwesomeWallet',
                  ),
              },
            ],
          );
        }}
      />
      <StyledButton
        iconName="trash"
        title="Eliminar datos"
        subTitle="Borrar todos los datos de la aplicacion"
        onPress={() => {
          Alert.alert(
            'Eliminar datos',
            'Estas a punto de eliminar todos los datos de la app.',
            [
              {text: 'Cancelar'},
              {
                text: 'Si, eliminar',
                onPress: () =>
                  Alert.alert(
                    'Estas seguro?',
                    'Los datos no se pueden recuperar.',
                    [
                      {text: 'Cancelar'},
                      {
                        text: 'Si, eliminar',
                        onPress: () =>
                          Realm.deleteFile({
                            schema: [Transaction],
                          }),
                      },
                    ],
                  ),
              },
            ],
          );
        }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
