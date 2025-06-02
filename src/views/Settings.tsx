import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Section from '../components/custom/Section';
import {useNavigation} from '@react-navigation/native';
import ModalWindow from '../components/custom/ModalWindow';
import StyledButton from '../components/custom/StyledButton';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Text} from 'react-native-paper';
import {themes} from '../styles/Theme';

// Define your stack param list type here or import it from your navigation types file
type SettingsStackParamList = {
  ThemesOption: undefined;
  CategoriesOption: undefined;
  // Add other screens here if needed
};

const Settings = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const openModal = (Component: React.ReactNode | undefined) => {
    setModalContent(Component);
    setModalVisible(true);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themes[currentThemeName.currentThemeName].background},
      ]}>
      <Section title="Cuenta" />
      <StyledButton
        iconName="user"
        title="Perfil"
        subTitle="Configuraciones del perfil"
        onPress={() => openModal(<Text>Perfil</Text>)}
      />
      <StyledButton
        iconName="bell"
        title="Notificaciones"
        subTitle="Encender las notificaciones"
      />
      <StyledButton
        iconName="fingerprint"
        title="Huella"
        subTitle="Administrar las configuraciones de huella"
      />
      <Section title="Preferencias" />
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
      <StyledButton
        iconName="list-ul"
        title="Categorias"
        subTitle="Administrar las categorias de transacciones"
        onPress={() => navigation.navigate('CategoriesOption')}
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
