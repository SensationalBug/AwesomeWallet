import React from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chart = ({data, maxHeight, height}: ChartProps) => {
  const {totalCredit, totalDebit, totalAmount} = data;
  console.log(totalCredit, totalDebit, totalAmount);
  return (
    <StyledView horizontal>
      {data &&
        data.byCategories.map((elem: any, index: number) => {
          const {name} = elem;
          return (
            <ChartBar
              key={index}
              text={name}
              maxValue={totalAmount}
              maxHeight={maxHeight}
              height={elem.totalCredit}
            />
          );
        })}
    </StyledView>
  );
};

export default Chart;
