import {themes} from '../styles/Theme';
import StyledDropDown from './custom/StyledDropDown';
import {ThemesContext} from '../context/ThemesContext';
import {ReportsContext} from '../context/ReportsContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderFilterButtonProps, ThemeType} from '../types/Types';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';

const MAX_CONTENT_HEIGHT = 180;

const HeaderFilterButton: React.FC<HeaderFilterButtonProps> = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {
    setSelectedPeriod,
    transactionsByDate,
    selectedPeriod,
    globalTransactions,
    setGlobalTransactions,
  } = useContext(ReportsContext);
  const theme = themes[currentThemeName.currentThemeName];

  const [selectedTransactionValue, setSelectedTransactionValue] = useState<
    string | null
  >(null);

  const animatedProgress = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);

  const interpolatedHeight = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_CONTENT_HEIGHT],
  });

  const interpolatedOpacity = animatedProgress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  const toggleAnimation = () => {
    if (!expanded) {
      setExpanded(true);
      Animated.timing(animatedProgress, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedProgress, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpanded(false);
      });
    }
  };

  const periodOptions = [
    {label: 'Mes', value: 'byMonthYear'},
    {label: 'Dia', value: 'byDayMonthYear'},
    {label: 'Año', value: 'byYear'},
  ];

  useEffect(() => {
    if (globalTransactions && globalTransactions.name) {
      setSelectedTransactionValue(globalTransactions.name);
    } else if (globalTransactions && globalTransactions.name) {
      setSelectedTransactionValue(globalTransactions.name);
    } else {
      setSelectedTransactionValue(null);
    }
  }, [globalTransactions]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={toggleAnimation}
        style={styles.buttonContainer}>
        <Icon name="filter" size={20} color={theme.text} />
      </TouchableOpacity>

      {expanded && (
        <Animated.View
          style={[
            styles.dropdownContainer,
            {
              backgroundColor: theme.iconBackground,
              height: interpolatedHeight,
              opacity: interpolatedOpacity,
            },
          ]}>
          <View>
            <StyledDropDown
              margin={0}
              data={periodOptions}
              value={selectedPeriod}
              onChange={elem => {
                setSelectedPeriod(elem.value);
              }}
            />
            <StyledDropDown
              margin={0}
              data={transactionsByDate[selectedPeriod]?.map((tx: any) => ({
                label: tx.name,
                value: tx.id || tx.name,
                ...tx,
              }))}
              value={selectedTransactionValue}
              onChange={elem => {
                setGlobalTransactions(elem);
                setSelectedTransactionValue(elem.value);
              }}
            />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default HeaderFilterButton;

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1000,
    position: 'relative',
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '95%',
    right: 10,
    width: 200,
    padding: 10,
    elevation: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  addButton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
