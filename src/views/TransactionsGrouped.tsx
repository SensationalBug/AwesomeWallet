import {View, Text, BackHandler, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import StyledView from '../components/custom/StyledView';
import {TransactionContext} from '../context/TransactionContext';
import {themes} from '../styles/Theme';
import {ThemesContext} from '../context/ThemesContext';
import {ThemeType} from '../types/Types';
import {CategoriesContext} from '../context/CategoriesContext';
import StyledText from '../components/custom/StyledText';

import { RouteProp } from '@react-navigation/native';

type TransactionsGroupedProps = {
  route: RouteProp<Record<string, object | undefined>, string>;
};

const TransactionsGrouped = ({route}: TransactionsGroupedProps) => {
  // const {deleteTransaction} = useContext(TransactionContext);
  // const {getCategoryById} = useContext(CategoriesContext);
  // const [transactionSelected, setTransactionSelected] = useState<any[]>([]);

  // const [isExtended, setIsExtended] = React.useState(true);
  // const [isVisible, setIsVisible] = React.useState(false);

  // const currentThemeName = useContext(ThemesContext) as ThemeType;
  // const theme = themes[currentThemeName.currentThemeName];

  // useEffect(() => {
  //   transactionSelected.length > 0 ? setIsVisible(true) : setIsVisible(false);

  //   const backAction = () => {
  //     if (transactionSelected.length > 0) {
  //       setTransactionSelected([]);
  //       return true; // Consume el evento, evita que la navegación hacia atrás o la salida se ejecuten
  //     }
  //     return false; // Permite el comportamiento predeterminado (navegar hacia atrás o salir)
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove(); // Limpia el event listener al desmontar el componente
  // }, [isVisible, transactionSelected]); // Dependencia: el efecto se re-evalúa si transactionSelected cambia

  return (
    <View>
      {/* <StyledView> */}
        <TouchableOpacity onPress={() => console.log(route)}>
          <StyledText text="transactionsByDate" />
        </TouchableOpacity>
        {/* {!(transactions.length > 0) ? (
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
                onPress={() => {}}
              />
            );
          })
        )} */}
      {/* </StyledView> */}
    </View>
  );
};

export default TransactionsGrouped;
