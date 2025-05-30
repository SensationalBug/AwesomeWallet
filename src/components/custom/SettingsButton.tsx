import {
  TouchableOpacity,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useContext} from 'react';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  const theme = useContext(ThemesContext) as ThemeType;
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.iconContainer,
          {backgroundColor: theme.theme.iconBackground},
        ]}>
        <Icon name={iconName} size={25} color="#000" />
      </View>
      <View style={[styles.textContainer, {width: width - 100}]}>
        <Text variant="titleLarge" style={[{color: theme.theme.text}]}>
          {title}
        </Text>
        <Text variant="labelLarge" style={[{color: theme.theme.textLabel}]}>
          {subTitle}
        </Text>
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
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 20,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
});
