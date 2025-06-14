import {
  ThemeType,
  CategoriesContextType,
  TransactionContextType,
} from '../types/Types';
import {Category} from '../db/schemas';
import {themes} from '../styles/Theme';
import Radio from '../components/Radio';
import {updateState} from '../utils/updateState';
import React, {useContext, useState} from 'react';
import {ThemesContext} from '../context/ThemesContext';
import StyledText from '../components/custom/StyledText';
import {CategoriesContext} from '../context/CategoriesContext';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import StyledDropDown from '../components/custom/StyledDropDown';
import StyledTextInput from '../components/custom/StyledTextInput';
import {TransactionContext} from '../context/TransactionContext';

const AddTransaction = () => {
  const {addTransaction} = useContext(
    TransactionContext,
  ) as TransactionContextType;
  const {categories} = useContext(CategoriesContext) as CategoriesContextType;

  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const date = new Date();
  const currentDate = `${date.getDay()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const [newTransaction, setNewTransaction] = useState<any>({
    amount: 0,
    category: undefined as unknown as Category,
    concept: '',
    cDate: currentDate,
    file: '/home',
    type: 'debito',
  });
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <StyledTextInput
        label="Descripción"
        value={newTransaction.concept}
        onChangeText={value => updateState(setNewTransaction, 'concept', value)}
      />
      <StyledTextInput
        label="Monto"
        keyboardType="numeric"
        value={newTransaction.amount}
        onChangeText={value => updateState(setNewTransaction, 'amount', value)}
      />
      <StyledDropDown
        data={categories.map(category => ({
          label: category.name,
          value: String(category._id),
          category,
        }))}
        value={(value: any) => {
          console.log(value);
        }}
        placeholder={'Selecciona una categoría'}
        onChange={(item: {
          label: string;
          value: string;
          category: Category;
        }) => {
          console.log(item);
          updateState(setNewTransaction, 'category', item.category);
        }}
      />
      <View style={styles.radioButtonView}>
        <Radio
          color="green"
          text="Débito"
          value="debito"
          onPress={() => updateState(setNewTransaction, 'type', 'debito')}
          status={newTransaction.type === 'debito' ? 'checked' : 'unchecked'}
        />
        <Radio
          color="red"
          text="Crédito"
          value="credito"
          onPress={() => updateState(setNewTransaction, 'type', 'credito')}
          status={newTransaction.type === 'credito' ? 'checked' : 'unchecked'}
        />
      </View>
      <TouchableOpacity
        disabled={
          !newTransaction.amount ||
          !newTransaction.concept.trim() ||
          !newTransaction.type.trim()
        }
        onPress={() => addTransaction(newTransaction)}
        style={[
          styles.addButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: theme.iconBackground,
            opacity:
              !newTransaction.amount ||
              !newTransaction.concept.trim() ||
              !newTransaction.type.trim()
                ? 0.4
                : 1,
          },
        ]}>
        <StyledText
          bold="bold"
          variant="titleMedium"
          text="Agregar transacción"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  dateView: {
    height: 50,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  radioButtonView: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
    alignItems: 'center',
  },
});

export default AddTransaction;
