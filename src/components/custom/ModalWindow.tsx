import React, {useContext} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  DimensionValue,
} from 'react-native';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';

type ModalWindowProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  component?: React.ElementType; // Component to render inside the modal
  width?: DimensionValue; // Width can be a number or a percentage string
  height?: DimensionValue; // Height can be a number or a percentage string
};

const ModalWindow: React.FC<ModalWindowProps> = ({
  modalVisible,
  setModalVisible,
  component,
  width = '10%', // Default width if not provided	',
  height = '100%', // Default height if not provided
}) => {
  const theme = useContext(ThemesContext) as ThemeType;
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={[styles.modalContainer]}>
        <View
          style={[
            styles.modalView,
            {backgroundColor: theme.theme.iconBackground, width, height},
          ]}>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>Cerrar</Text>
          </Pressable>
          {component && React.createElement(component)}
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
