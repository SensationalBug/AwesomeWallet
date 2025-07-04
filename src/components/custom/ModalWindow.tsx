import StyledText from './StyledText';
import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import {ThemesContext} from '../../context/ThemesContext';
import {ModalWindowProps, ThemeType} from '../../types/Types';
import {Modal, View, Pressable, StyleSheet} from 'react-native';

const ModalWindow: React.FC<ModalWindowProps> = ({
  modalVisible,
  setModalVisible,
  component,
  width = '100%', // Default width if not provided	',
  height = '100%', // Default height if not provided
}) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor:
              themes[currentThemeName.currentThemeName].modalBackdrop,
          },
        ]}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor:
                themes[currentThemeName.currentThemeName].background,
              width,
              height,
              borderColor:
                themes[currentThemeName.currentThemeName].modalBorder,
            },
          ]}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <StyledText text="Cerrar" />
          </Pressable>
          {component}
        </View>
      </View>
    </Modal>
  );
};

export default ModalWindow;

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#122e49', // Removed as it's now set dynamically
  },
  buttonIcon: {
    width: 50,
    height: 50,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F9FD0',
  },
  buttonClose: {
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F24C3D',
  },
});
