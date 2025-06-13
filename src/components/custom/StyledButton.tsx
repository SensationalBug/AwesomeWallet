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
import {Text} from 'react-native-paper';

interface SettingsButtonProps {
  title: string;
  subTitle?: string;
  iconName?: string;
  amount?: number;
  type?: string;
  onPress?: () => void;
  onLongPress?: () => void;
}
const StyledButton = ({
  title,
  subTitle,
  iconName,
  amount,
  type,
  onPress,
  onLongPress,
}: SettingsButtonProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View
        style={[styles.iconContainer, {backgroundColor: theme.iconBackground}]}>
        <Icon name={iconName || 'help'} size={25} color={theme.text} />
      </View>
      <View style={[styles.textContainer, {width: width - 100}]}>
        {subTitle ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <View style={[styles.textView, {width: 'auto'}]}>
            <StyledText variant="titleLarge" text={title} />
            <StyledText variant="labelLarge" text={subTitle} label />
          </View>
        ) : (
          <View style={styles.textView}>
            <StyledText variant="titleLarge" text={title} />
          </View>
        )}
        {amount ? (
          <View style={styles.amountView}>
            <Text
              style={{
                color:
                  type === 'debito'
                    ? theme.transactionTypeDebit
                    : theme.transactionTypeCredit,
              }}
              variant="labelLarge">
              RD$10000000.00
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default StyledButton;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {flexDirection: 'column', width: '55%'},
  amountView: {
    width: '45%',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
});
