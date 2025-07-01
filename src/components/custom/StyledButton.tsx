import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import StyledText from './StyledText';
import {Text} from 'react-native-paper';
import React, {useContext} from 'react';
import {themes} from '../../styles/Theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemesContext} from '../../context/ThemesContext';
import {SettingsButtonProps, ThemeType} from '../../types/Types';
import {formatNumber} from '../../utils/formatNumber';

const StyledButton = ({
  title,
  subTitle,
  iconName,
  amount,
  type,
  onPress,
  onLongPress,
  backgroundColor,
  date,
  children,
}: SettingsButtonProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
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
              RD${formatNumber(amount)}
            </Text>
            {date ? (
              <StyledText variant="labelLarge" text={date} label />
            ) : null}
          </View>
        ) : null}
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 10,
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
