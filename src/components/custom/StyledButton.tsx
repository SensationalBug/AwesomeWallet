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
import {formatNumber} from '../../utils/formatNumber';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ThemesContext} from '../../context/ThemesContext';
import {SettingsButtonProps, ThemeType} from '../../types/Types';
import {TransactionContext} from '../../context/TransactionContext';

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
  disabled = false,
}: SettingsButtonProps) => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {currency} = useContext(TransactionContext);
  const theme = themes[currentThemeName.currentThemeName];
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, {backgroundColor}]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View
        style={[styles.iconContainer, {backgroundColor: theme.iconBackground}]}>
        <Icon name={iconName || 'help'} size={20} color={theme.text} />
      </View>
      <View style={[styles.textContainer]}>
        {subTitle ? (
          <View style={styles.textView}>
            <StyledText variant="titleLarge" text={title} />
            <StyledText variant="labelLarge" text={subTitle} label />
          </View>
        ) : (
          <View style={styles.textView}>
            <StyledText variant="titleLarge" text={title} />
          </View>
        )}
        <View style={styles.sideView}>
          {amount ? (
            <View>
              <Text
                style={{
                  color:
                    type === 'debito'
                      ? theme.chartBarNegativeColor
                      : theme.chartBarColor,
                }}
                variant="labelLarge">
                {currency}${formatNumber(amount)}
              </Text>
              {date ? (
                <StyledText variant="labelLarge" text={date} label />
              ) : null}
            </View>
          ) : (
            children
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: '10%',
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    width: '60%',
  },
  sideView: {
    width: '30%',
    alignItems: 'center',
  },
});
