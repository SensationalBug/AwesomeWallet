import {View} from 'react-native';
import React, {useContext} from 'react';
import StyledDropDown from './custom/StyledDropDown';
import {ReportsContext} from '../context/ReportsContext';

const HeaderDropdown = ({width = '100%'}) => {
  const {
    periodOptions,
    selectedPeriod,
    setSelectedPeriod,
    transactionsByDate,
    setGlobalTransactions,
    selectedTransactionValue,
    setSelectedTransactionValue,
  } = useContext(ReportsContext);
  return (
    <View>
      <StyledDropDown
        margin={0}
        width={width}
        data={periodOptions}
        value={selectedPeriod}
        onChange={elem => {
          setSelectedPeriod(elem.value);
        }}
      />
      <StyledDropDown
        margin={0}
        width={width}
        data={transactionsByDate[selectedPeriod]?.map((tx: any) => ({
          label: tx.name,
          value: tx.id || tx.name,
          ...tx,
        }))}
        value={selectedTransactionValue}
        onChange={elem => {
          setGlobalTransactions(elem);
          setSelectedTransactionValue(elem.value);
        }}
      />
    </View>
  );
};

export default HeaderDropdown;
