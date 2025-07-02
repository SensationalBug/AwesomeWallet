import {themes} from '../styles/Theme';
import HeaderDropdown from './HeaderDropdown';
import {ThemesContext} from '../context/ThemesContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useContext, useRef, useState} from 'react';
import {HeaderFilterButtonProps, ThemeType} from '../types/Types';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';

const MAX_CONTENT_HEIGHT = 180;

const HeaderFilterButton: React.FC<HeaderFilterButtonProps> = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

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
          <HeaderDropdown />
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
