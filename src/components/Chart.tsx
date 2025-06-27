import React from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';

const Chart = ({data, maxHeight}: ChartProps) => {
  const getMaxDebit = () => {
    const maxDebit: any[] = [];
    data &&
      data.byCategories.map((category: any) => {
        const {totalDebit} = category;
        maxDebit.push(totalDebit);
      });
    return Math.max(...maxDebit);
  };
  return (
    <StyledView horizontal>
      {data &&
        data.byCategories.map((category: any, index: number) => {
          const {name, totalDebit} = category;
          return (
            !totalDebit || (
              <ChartBar
                key={index}
                text={name}
                maxHeight={maxHeight}
                value={totalDebit}
                height={(totalDebit / getMaxDebit()) * 100}
              />
            )
          );
        })}
    </StyledView>
  );
};

export default Chart;
