import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ViewStyle,
  Platform,
  StyleSheet,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  backgroundColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  style?: ViewStyle;
};

const ThemedSafeArea = ({children, style = {}}: Props) => {
  return (
    <SafeAreaView style={styles.flex1}>
      <StatusBar
        translucent={Platform.OS === 'android'}
        backgroundColor="transparent"
      />
      <SafeAreaView style={[styles.flex1, style]}>{children}</SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});

export default ThemedSafeArea;
