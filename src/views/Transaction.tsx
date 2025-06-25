import {themes} from '../styles/Theme';
import {ThemesContext} from '../context/ThemesContext';
import StyledView from '../components/custom/StyledView';
import {NavigationProps, ThemeType} from '../types/Types';
import AnimatedButton from '../components/AnimatedButton';
import {BackHandler, StyleSheet, View} from 'react-native';
import StyledButton from '../components/custom/StyledButton';
import React, {useContext, useEffect, useState} from 'react';
import {TransactionContext} from '../context/TransactionContext';
import {CategoriesContext} from '../context/CategoriesContext';
import StyledText from '../components/custom/StyledText';

const Transaction = ({navigation}: NavigationProps) => {
  const {transactions, deleteTransaction, getTransactionByID} =
    useContext(TransactionContext);
  const {getCategoryById} = useContext(CategoriesContext);
  const [transactionSelected, setTransactionSelected] = useState<any[]>([]);

  const [isExtended, setIsExtended] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);

  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const onScrollEnd = () => setIsExtended(true);
  const onScrollStart = () => setIsExtended(false);

  useEffect(() => {
    transactionSelected.length > 0 ? setIsVisible(true) : setIsVisible(false);

    const backAction = () => {
      if (transactionSelected.length > 0) {
        setTransactionSelected([]);
        return true; // Consume el evento, evita que la navegación hacia atrás o la salida se ejecuten
      }
      return false; // Permite el comportamiento predeterminado (navegar hacia atrás o salir)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Limpia el event listener al desmontar el componente
  }, [isVisible, transactionSelected]); // Dependencia: el efecto se re-evalúa si transactionSelected cambia

  return (
    <View style={styles.container}>
      <StyledView onScroll={onScrollStart} onScrollEnd={onScrollEnd}>
        {!(transactions.length > 0) ? (
          <StyledView contentContainerStyle={styles.noTransactionView}>
            <StyledText
              variant="titleLarge"
              text="Aún no tienes transacciones 😐"
            />
            <StyledText
              variant="titleMedium"
              text='Pulsa "+ Nueva Transacción" para agregar alguna.'
            />
          </StyledView>
        ) : (
          transactions.map((value: any, index: any) => {
            const {_id, concept, amount, category, cDate, type} = value;
            const categoryIcon = (
              getCategoryById(category) as unknown as {icon?: string}
            )?.icon;
            const categoryName = (
              getCategoryById(category) as unknown as {name?: string}
            )?.name;
            return (
              <StyledButton
                backgroundColor={
                  transactionSelected.some(
                    elem => elem.toString() === _id.toString(),
                  )
                    ? theme.iconBackground
                    : undefined
                }
                key={index}
                title={concept}
                iconName={categoryIcon}
                subTitle={categoryName}
                amount={amount}
                type={type}
                date={cDate.split('T')[0]}
                // onPress={() => console.log(category)}
                onPress={() => {
                  // Evalua si la transaccion esta seleccionada
                  transactionSelected.some(
                    elem => elem.toString() === _id.toString(),
                  )
                    ? // Si está la elimina
                      setTransactionSelected(prev =>
                        prev.filter(id => id.toString() !== _id.toString()),
                      )
                    : // Si no está la agrega
                      setTransactionSelected(prev => [...prev, _id]);
                }}
              />
            );
          })
        )}
      </StyledView>
      <AnimatedButton
        icon="plus"
        color={theme.text}
        visible={!isVisible}
        isExtended={isExtended}
        label="Nueva transacción"
        onPress={() => navigation.navigate('AddTransaction')}
      />
      <AnimatedButton
        icon="pencil"
        color={theme.text}
        visible={isVisible}
        isExtended={false}
        onPress={() =>
          getTransactionByID(transactionSelected).then(transactionToUpdate =>
            navigation.navigate('AddTransaction', {
              transactionId: transactionToUpdate?._id.toHexString(),
              concept: transactionToUpdate?.concept,
              amount: transactionToUpdate?.amount,
              category: transactionToUpdate?.category,
              cDate: transactionToUpdate?.cDate,
              file: transactionToUpdate?.file,
              type: transactionToUpdate?.type,
              setTransactionSelected,
            }),
          )
        }
        opacity={transactionSelected.length > 1 ? 0.7 : 1}
        disabled={transactionSelected.length > 1 ? true : false}
      />
      <AnimatedButton
        right={100}
        icon="close"
        color={theme.text}
        visible={isVisible}
        isExtended={false}
        onPress={() => {
          deleteTransaction(transactionSelected).then(() =>
            setTransactionSelected([]),
          );
        }}
      />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noTransactionView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
