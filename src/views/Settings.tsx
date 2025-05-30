import {View, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {ThemesContext, ThemeType} from '../context/ThemesContext';
import Section from '../components/custom/Section';
import SettingsButton from '../components/custom/SettingsButton';
import ModalWindow from '../components/custom/ModalWindow';

const NotificacionesComponent = () => (
  <View>
    <SettingsButton
        iconName="user"
        title="Perfil"
        subTitle="Configuraciones del perfil"
      />
  </View>
);

const Settings = () => {
  const theme = useContext(ThemesContext) as ThemeType;
  const [modalVisible, setModalVisible] = React.useState(false);
const [modalContent, setModalContent] = React.useState<(() => React.JSX.Element) | undefined>(undefined);

const openModal = (Component: (() => React.JSX.Element) | undefined) => {
  setModalContent(Component); // Guardamos el componente
  setModalVisible(true);
};
  return (
    <View style={[styles.container, {backgroundColor: theme.theme.background}]}>
      <Section text="Cuenta" />
      <SettingsButton
        iconName="user"
        title="Perfil"
        subTitle="Configuraciones del perfil"
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
      <Section text="Preferencias" />
      <SettingsButton
        iconName="sun"
        title="Tema y colores"
        subTitle="Cambiar tema y colores"
        onPress={() => openModal(NotificacionesComponent)}
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

      <Section text="Soporte y Ayuda" />
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
