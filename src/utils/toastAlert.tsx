import React from 'react';
import {StyleSheet} from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

export const showToast = (
  type: string,
  text1: string,
  duration: number = 1200,
) => {
  Toast.show({
    type: type,
    text1: text1,
    visibilityTime: duration,
  });
};

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.successColor}
      text1Style={styles.text1Style}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={styles.errorColor}
      text1Style={styles.text1Style}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={styles.infoColor}
      text1Style={styles.text1Style}
    />
  ),
};

const styles = StyleSheet.create({
  text1Style: {fontSize: 12},
  infoColor: {borderLeftColor: '#1F9FD0', borderLeftWidth: 10},
  errorColor: {borderLeftColor: '#F24C3D', borderLeftWidth: 10},
  successColor: {borderLeftColor: '#1F8A70', borderLeftWidth: 10},
});
