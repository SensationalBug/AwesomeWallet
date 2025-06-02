import React from 'react';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SafeAreaView, StatusBar, ViewStyle, StyleSheet} from 'react-native';

type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  style?: ViewStyle;
};

const ThemedSafeArea = ({children, style = {}}: Props) => {
  // const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar />
      <SafeAreaView
        style={[
          style,
          styles.container,
          // {paddingBottom: insets.bottom, paddingTop: insets.top},
        ]}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemedSafeArea;
