import {} from 'react-native';
import React from 'react';
import StyledView from '../components/custom/StyledView';
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

const Transaction = () => {
  const {category, amount, concept, date, type} = transacitionP;
  return (
    <StyledView>
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
  );
};

export default Transaction;
