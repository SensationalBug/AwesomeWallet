import React from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Chart = ({data, maxHeight, maxValue, height}: ChartProps) => {
  // console.log(data, 'data');
  const totalCredit = () => {
    let creditCounter = 0;

    data &&
      data.map((elem: any) => {
        creditCounter += elem.totalCredit;
      });

    return creditCounter;
  };
  totalCredit();
  return (
    <StyledView horizontal>
      {data &&
        data.map((elem: any, index: number) => (
          <ChartBar
            key={index}
            text={`${maxValue}`}
            // text={elem.name}
            maxValue={totalCredit()}
            maxHeight={maxHeight}
            height={(elem.amount / maxValue) * maxHeight}
          />
        ))}
    </StyledView>
  );
};

export default Chart;
