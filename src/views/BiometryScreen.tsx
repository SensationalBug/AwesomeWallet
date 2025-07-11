import {themes} from '../styles/Theme';
import {ThemeType} from '../types/Types';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ThemesContext} from '../context/ThemesContext';
import StyledView from '../components/custom/StyledView';
import {BiometryContext} from '../context/BiometryContext';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types/Types';
import StyledText from '../components/custom/StyledText';

const BiometryScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {authenticate} = useContext(BiometryContext);

  useEffect(() => {
    const performAuthAndNavigate = async () => {
      authenticate().then(() => {
        navigation.replace('Main');
      });
    };

    performAuthAndNavigate();
  }, [authenticate, navigation]);

  return (
    <StyledView contentContainerStyle={styles.container}>
      <Icon name="lock" color={theme.text} size={200} />
      <View style={styles.iconContainer}>
        <StyledText text="Preciona para autenticar" variant="titleLarge" />
        <TouchableOpacity
          onPress={() =>
            authenticate().then(() => {
              navigation.replace('Main');
            })
          }>
          <Icon name="fingerprint" color={theme.text} size={80} />
        </TouchableOpacity>
      </View>
    </StyledView>
  );
};

export default BiometryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 100,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
