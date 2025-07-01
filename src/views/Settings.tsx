import React, {useContext} from 'react';
import {Switch} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import Section from '../components/custom/Section';
import {useNavigation} from '@react-navigation/native';
import {ThemesContext} from '../context/ThemesContext';
import ModalWindow from '../components/custom/ModalWindow';
import StyledButton from '../components/custom/StyledButton';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {themes} from '../styles/Theme';
import {BiometryContext} from '../context/BiometryContext';
import {SettingsStackParamList, ThemeType} from '../types/Types';

const Settings = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);
  const {isBiometryActive, enableBiometry} = useContext(BiometryContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const openModal = (Component: React.ReactNode | undefined) => {
    setModalContent(Component);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Section title="Cuenta" />
      <StyledButton
        iconName="user"
        title="Preferencias"
        subTitle="Opciones generales"
        onPress={() => {}}
      />
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
        iconName="dollar-sign"
        title="Tipo de moneda"
        subTitle="Administrar los tipos de moneda"
      />
      <Section title="Soporte y Ayuda" />
      <StyledButton
        iconName="question"
        title="Centro de ayuda"
        subTitle="Preguntas frecuentes y soporte técnico"
      />
      <StyledButton
        iconName="info"
        title="Acerca de"
        subTitle="Política de privacidad y términos de uso"
      />
      <ModalWindow
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        component={modalContent}
      />
      <StyledButton
        iconName="trash"
        title="Eliminar cuenta"
        subTitle="Borrar todos los datos de la aplicacion"
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
