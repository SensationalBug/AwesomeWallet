import React from 'react';
import {StyleSheet, View} from 'react-native';
import { NavigationProps } from '../types/Types';
import StyledView from '../components/custom/StyledView';
import AnimatedButton from '../components/AnimatedButton';
import StyledButton from '../components/custom/StyledButton';

const transacitionP = {
  _id: 1,
  category: 'Category',
  amount: 500.0,
  concept: 'stringCategory',
  date: 'DateCategory',
  file: 'stringCategory',
  type: ['debito', 'credito'],
};

const Transaction = ({navigation}:NavigationProps) => {
  const {category, amount, concept, date, type} = transacitionP;

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
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[1]}
        />
        <StyledButton
          title={concept}
          iconName={category}
          subTitle={date}
          amount={amount}
          type={type[0]}
        />
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
