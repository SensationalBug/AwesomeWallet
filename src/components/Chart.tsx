import React from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';

const Chart = ({data, maxHeight}: ChartProps) => {
  const getMaxDebit = () => {
    const maxDebit: any[] = [];
    data &&
      data.map((category: any) => {
        const {totalDebit} = category;
        maxDebit.push(totalDebit);
      });
    return Math.max(...maxDebit);
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
              debit={totalDebit}
              dHeight={(totalDebit / getMaxDebit()) * 100}
              credit={totalCredit}
              cHeight={(totalCredit / getMaxDebit()) * 100}
              tAmount={totalAmount}
            />
          );
        })}
    </StyledView>
  );
};

export default Chart;
