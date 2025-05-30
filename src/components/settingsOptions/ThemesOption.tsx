import React, {useContext} from 'react';
import Section from '../custom/Section';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {ThemesContext} from '../../context/ThemesContext';

const ThemesOption = () => {
  const setCurrentThemeName = useContext(ThemesContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Section title="Seleccionna tu tema preferido" />
      </View>
      <View>
        <TouchableOpacity onPress={() => console.log(setCurrentThemeName)}>
          <Text>setCurrentThemeName</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThemesOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
