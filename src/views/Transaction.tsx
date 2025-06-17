import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProps, ThemeType} from '../types/Types';
import StyledView from '../components/custom/StyledView';
import AnimatedButton from '../components/AnimatedButton';
import StyledButton from '../components/custom/StyledButton';
import {TransactionContext} from '../context/TransactionContext';
import {ThemesContext} from '../context/ThemesContext';
import {themes} from '../styles/Theme';

const Transaction = ({navigation}: NavigationProps) => {
  const {transactions, deleteTransaction} = useContext(TransactionContext);

  const [transactionSelected, setTransactionSelected] = useState<any[]>([]);

  const [isExtended, setIsExtended] = React.useState(false); //esto va true
  const [isVisible, setIsVisible] = React.useState(false);

  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const onScrollStart = () => {
    setIsExtended(false);
  };

  const onScrollEnd = () => {
    setIsExtended(true);
  };

  return (
    <View style={styles.container}>
      <StyledView onScroll={onScrollStart} onScrollEnd={onScrollEnd}>
        {transactions.map((value: any, index: any) => {
          const {_id, concept, amount, category, cDate, type} = value;
          return (
            <StyledButton
              key={index}
              title={concept}
              iconName={category}
              subTitle={cDate}
              amount={amount}
              type={type}
              // onLongPress={() => deleteTransaction(_id)}
              onPress={() => {
                if (
                  transactionSelected.some(
                    elem => elem.toString() === _id.toString(),
                  )
                ) {
                  transactionSelected.filter(
                    id => id.toString() !== _id.toString(),
                  );
                  console.log('eliminado');
                } else {
                  setTransactionSelected(prev => [...prev, _id]);
                  console.log('agregado');
                }
              }}
            />
          );
        })}
      </StyledView>
      {/* <AnimatedButton
        visible={!isVisible}
        isExtended={isExtended}
        label="Nueva transacción"
        onPress={() => navigation.navigate('AddTransaction')}
        icon="plus"
        color={theme.text}
      /> */}
      {/* <AnimatedButton
        visible={isVisible}
        isExtended={false}
        onPress={() => {}}
        icon="pencil"
        color={theme.text}
      /> */}
      <AnimatedButton
        // visible={isVisible}
        visible
        isExtended={false}
        onPress={() => console.log(transactionSelected)}
        icon="close"
        color={theme.text}
        right={100}
      />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
