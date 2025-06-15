import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProps} from '../types/Types';
import StyledView from '../components/custom/StyledView';
import AnimatedButton from '../components/AnimatedButton';
import StyledButton from '../components/custom/StyledButton';
import {TransactionContext} from '../context/TransactionContext';

const Transaction = ({navigation}: NavigationProps) => {
  const {transactions, deleteTransaction} = useContext(TransactionContext);
  const [isExtended, setIsExtended] = React.useState(true);

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
              onLongPress={() => deleteTransaction(_id)}
            />
          );
        })}
      </StyledView>
      <AnimatedButton
        visible
        isExtended={isExtended}
        label="Nueva transacción"
        onPress={() => navigation.navigate('AddTransaction')}
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
