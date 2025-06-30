import React, {useContext} from 'react';
import {Modal, Portal, ActivityIndicator} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {ThemesContext} from '../../context/ThemesContext';
import {ThemeType} from '../../types/Types';
import {themes} from '../../styles/Theme';

type LoaderProps = {
  visible: boolean;
};

const Loader: React.FC<LoaderProps> = ({visible}) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={[
          styles.modalContent,
          {backgroundColor: 'transparent'}, // Fondo del modal transparente
        ]}>
        <View
          style={[
            styles.container,
            // Opcional: un fondo semi-transparente para el View si se desea
            // {backgroundColor: 'rgba(0, 0, 0, 0.1)'},
          ]}>
          <ActivityIndicator
            animating={true}
            color={theme.primary}
            size="large"
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Loader;
