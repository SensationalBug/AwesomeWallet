import React from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';

const Chart = ({data, maxHeight, showTamount}: ChartProps) => {
  const getMaxAbsValue = () => {
    let maxCredit = 0;
    let maxDebit = 0;

    if (data) {
      data.forEach((category: any) => {
        const credit =
          typeof category.totalCredit === 'number' ? category.totalCredit : 0;
        const debit =
          typeof category.totalDebit === 'number' ? category.totalDebit : 0;

        if (credit > maxCredit) {
          maxCredit = credit;
        }

        if (debit > maxDebit) {
          maxDebit = debit;
        }
      });
    }

    const absoluteMaxCredit = Math.abs(maxCredit);
    const absoluteMaxDebit = Math.abs(maxDebit);

    return Math.max(absoluteMaxCredit, absoluteMaxDebit);
  };

  return (
    <StyledView horizontal>
      {data &&
        data.map((category: any, index: number) => {
          const {name, totalDebit, totalCredit, totalAmount} = category;
          return (
            <ChartBar
              key={index}
              text={name}
              maxHeight={maxHeight}
              showTamount={showTamount}
              debit={totalDebit}
              dHeight={(totalDebit / getMaxAbsValue()) * maxHeight}
              credit={totalCredit}
              cHeight={(totalCredit / getMaxAbsValue()) * maxHeight}
              tAmount={totalAmount}
            />
          );
        })}
    </StyledView>
  );
};

export default Chart;
