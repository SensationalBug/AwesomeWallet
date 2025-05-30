import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Section from '../components/custom/Section';
import {useNavigation} from '@react-navigation/native';
import ModalWindow from '../components/custom/ModalWindow';
import SettingsButton from '../components/custom/SettingsButton';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import { Text } from 'react-native-paper';

// Define your stack param list type here or import it from your navigation types file
type SettingsStackParamList = {
  ThemesOption: undefined;
  // Add other screens here if needed
};

const Settings = () => {
  const theme = useContext(ThemesContext) as ThemeType;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const openModal = (Component: React.ReactNode | undefined) => {
    setModalContent(Component);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.theme.background}]}>
      <Section title="Cuenta" />
      <SettingsButton
        iconName="user"
        title="Perfil"
        subTitle="Configuraciones del perfil"
        onPress={() => openModal(<Text>Perfil</Text>)}
      />
      <SettingsButton
        iconName="bell"
        title="Notificaciones"
        subTitle="Encender las notificaciones"
      />
      <SettingsButton
        iconName="shield-alt"
        title="Seguridad"
        subTitle="Administrar las configuraciones de seguridad"
      />
      <Section title="Preferencias" />
      <SettingsButton
        iconName="sun"
        title="Tema y colores"
        subTitle="Cambiar tema y colores"
        onPress={() => navigation.navigate('ThemesOption')}
      />
      <SettingsButton
        iconName="dollar-sign"
        title="Tipo de moneda"
        subTitle="Administrar las configuraciones de tipo de moneda"
      />
      <SettingsButton
        iconName="fingerprint"
        title="Huella"
        subTitle="Administrar las configuraciones de huella"
      />

      <Section title="Soporte y Ayuda" />
      <SettingsButton
        iconName="question"
        title="Centro de ayuda"
        subTitle="Preguntas frecuentes y soporte técnico"
      />
      <SettingsButton
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
