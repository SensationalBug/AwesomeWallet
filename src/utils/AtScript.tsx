import {View, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
// import {TransactionContext} from '../context/TransactionContext';
import {CategoriesContext} from '../context/CategoriesContext';
import StyledText from '../components/custom/StyledText';

const AtScript = () => {
  // const {addTransaction} = useContext(TransactionContext);
  const {categories} = useContext(CategoriesContext);
  const currentDate = new Date().toISOString();
  const [newTransaction, setNewTransaction] = useState<any>({
    amount: '',
    category: '',
    concept: '',
    cDate: currentDate,
    file: '/home',
    type: '',
  });

  const add = () => {
    for (let i = 1; i <= 10; i++) {
      setNewTransaction({
        amount: Math.round(Math.random() * 100000),
        category: String(categories[i]._id),
        concept: String(categories[i].name),
        cDate: currentDate,
        file: '/home',
        type: i % 2 === 0 ? 'debito' : 'credito',
      });

      console.log(newTransaction);
      // addTransaction({})
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => add()}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          padding: 15,
          elevation: 8,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StyledText
          bold="bold"
          variant="titleMedium"
          text="Añadir Transacción"
        />
      </TouchableOpacity>
    </View>
  );
};

export default AtScript;
