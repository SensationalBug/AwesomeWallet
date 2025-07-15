import {
  ThemeType,
  CategoriesContextType,
  TransactionContextType,
  NavigationProps,
} from '../types/Types';
import {BSON} from 'realm';
import {themes} from '../styles/Theme';
import Radio from '../components/Radio';
import {updateState} from '../utils/updateState';
import {ThemesContext} from '../context/ThemesContext';
import StyledText from '../components/custom/StyledText';
import React, {useContext, useEffect, useState} from 'react';
import {CategoriesContext} from '../context/CategoriesContext';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import StyledDropDown from '../components/custom/StyledDropDown';
import {TransactionContext} from '../context/TransactionContext';
import StyledTextInput from '../components/custom/StyledTextInput';

const AddTransaction = ({navigation, route}: NavigationProps) => {
  const {addTransaction, updateTransaction, setTransactionSelected} =
    useContext(TransactionContext) as TransactionContextType;
  const {categories, getCategoryById} = useContext(
    CategoriesContext,
  ) as CategoriesContextType;

  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const transactionToUpdate = route?.params;
  const currentDate = new Date().toISOString();

  const [newTransaction, setNewTransaction] = useState<any>({
    amount: '',
    category: '',
    concept: '',
    cDate: currentDate,
    file: '/home',
    type: '',
  });

  useEffect(() => {
    if (transactionToUpdate) {
      const {amount, category, concept, cDate, file, type} =
        transactionToUpdate;
      updateState(setNewTransaction, 'amount', String(amount));
      updateState(setNewTransaction, 'category', category);
      updateState(setNewTransaction, 'concept', concept);
      updateState(setNewTransaction, 'cDate', cDate);
      updateState(setNewTransaction, 'file', file);
      updateState(setNewTransaction, 'type', type);
    }
  }, [transactionToUpdate]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <StyledTextInput
        label="Descripción"
        value={newTransaction.concept}
        length={newTransaction.concept.length}
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
          value: category.name,
          id: category._id,
        }))}
        value={
          (
            getCategoryById(newTransaction.category) as
              | {name?: string}
              | undefined
          )?.name
        }
        placeholder={'Selecciona una categoría'}
        onChange={(item: {
          label: string;
          value: string;
          id?: BSON.ObjectId;
        }) => {
          if (item.id) {
            getCategoryById(item.id);
            updateState(setNewTransaction, 'category', String(item.id));
          }
        }}
      />
      <View style={styles.radioButtonView}>
        <StyledText variant="titleMedium" text="Tipo de transacción:" />
        <Radio
          color={theme.chartBarNegativeColor}
          text="Débito"
          value="debito"
          onPress={() => updateState(setNewTransaction, 'type', 'debito')}
          status={newTransaction.type === 'debito' ? 'checked' : 'unchecked'}
        />
        <Radio
          color={theme.chartBarColor}
          text="Crédito"
          value="credito"
          onPress={() => updateState(setNewTransaction, 'type', 'credito')}
          status={newTransaction.type === 'credito' ? 'checked' : 'unchecked'}
        />
      </View>
      <TouchableOpacity
        disabled={
          !newTransaction.concept.trim() ||
          !newTransaction.amount ||
          !newTransaction.category ||
          !newTransaction.type.trim()
        }
        onPress={() => {
          if (transactionToUpdate) {
            updateTransaction(
              transactionToUpdate.transactionId,
              newTransaction,
            ).then(() => {
              navigation.goBack();
              setTransactionSelected([]);
            });
          } else {
            addTransaction(newTransaction);
          }
          setNewTransaction({
            amount: '',
            category: '',
            concept: '',
            cDate: currentDate,
            file: '/home',
            type: '',
          });
        }}
        style={[
          styles.addButton,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: theme.iconBackground,
            opacity:
              !newTransaction.concept.trim() ||
              !newTransaction.amount ||
              !newTransaction.category ||
              !newTransaction.type.trim()
                ? 0.4
                : 1,
          },
        ]}>
        <StyledText
          bold="bold"
          variant="titleMedium"
          text={
            transactionToUpdate ? 'Editar transacción' : 'Agregar transacción'
          }
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
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
