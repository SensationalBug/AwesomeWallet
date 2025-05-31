import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import StyledText from './StyledText';
import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';

interface SettingsButtonProps {
  title: string;
  iconName: string;
  subTitle: string;
  onPress?: () => void;
}
const SettingsButton = ({
  title,
  subTitle,
  iconName,
  onPress,
}: SettingsButtonProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              themes[currentThemeName.currentThemeName].iconBackground,
          },
        ]}>
        <Icon name={iconName} size={25} color={themes[currentThemeName.currentThemeName].text} />
      </View>
      <View style={[styles.textContainer, {width: width - 100}]}>
        <StyledText variant="titleLarge" text={title} />
        <StyledText variant="labelLarge" text={subTitle} label/>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
});
