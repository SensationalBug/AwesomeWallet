import React, {useContext} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  DimensionValue,
} from 'react-native';
import {themes} from '../../styles/Theme';
import {ThemeType} from '../../types/Types';
import {ThemesContext} from '../../context/ThemesContext';

type ModalWindowProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  component?: React.ReactNode; // Component to render inside the modal
  width?: DimensionValue; // Width can be a number or a percentage string
  height?: DimensionValue; // Height can be a number or a percentage string
  borderColor?: string;
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  modalVisible,
  setModalVisible,
  component,
  width = '100%', // Default width if not provided	',
  height = '100%', // Default height if not provided
  borderColor = '',
}) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={[styles.modalContainer]}>
        <View
          style={[
            styles.modalView,
            {
              backgroundColor:
                themes[currentThemeName.currentThemeName].background,
              width,
              height,
              borderColor: borderColor,
            },
          ]}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>Cerrar</Text>
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
    backgroundColor: '#122e49',
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
