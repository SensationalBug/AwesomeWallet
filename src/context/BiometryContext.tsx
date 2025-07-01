import React, {createContext, useEffect, useState} from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BiometryContext = {
  isBiometryActive: boolean;
  enableBiometry: () => Promise<void>;
  authenticate: () => Promise<void>;
};

export const BiometryContext = createContext<BiometryContext>({
  isBiometryActive: false,
  authenticate: async () => {},
  enableBiometry: async () => {},
});

export const BiometryProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isBiometryActive, setIsBiometryActive] = useState<boolean>(false);

  const rnBiometrics = new ReactNativeBiometrics();

  const enableBiometry = async () => {
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirma tu identidad'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          const newBiometryState = !isBiometryActive;
          setIsBiometryActive(newBiometryState);
          AsyncStorage.setItem('biometry', JSON.stringify(newBiometryState));
        }
      })
      .catch(err => {
        console.log(err, 'biometrics failed');
      });
  };

  const authenticate = async () => {
    return new Promise<any>((resolve, reject) => {
      rnBiometrics
        .simplePrompt({promptMessage: 'Confirma tu identidad'})
        .then(resultObject => {
          const {success} = resultObject;

          if (success) {
            resolve(success);
          }
        })
        .catch(err => {
          console.log(err, 'biometrics failed');
          reject(err);
        });
    });
  };

  useEffect(() => {
    const checkBiometricsAndSetInitialRoute = async () => {
      try {
        const success = await AsyncStorage.getItem('biometry');
        if (success === 'true') {
          setIsBiometryActive(true);
        } else {
          setIsBiometryActive(false);
        }
      } catch (error) {
        console.error('Error al verificar biometría:', error);
      }
    };
    checkBiometricsAndSetInitialRoute();
  }, [isBiometryActive]);

  return (
    <BiometryContext.Provider
      value={{isBiometryActive, enableBiometry, authenticate}}>
      {children}
    </BiometryContext.Provider>
  );
};

export default BiometryContext;
