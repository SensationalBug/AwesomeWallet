import React, {useContext} from 'react';
import ChartBar from './charts/ChartBar';
import StyledView from './custom/StyledView';
import {MetricsContext} from '../context/MetricsContext';
import {ChartProps, MetricsTypeProps} from '../types/Types';

export default function Chart({data}: ChartProps) {
  const {transactionsByType} = useContext(
    MetricsContext,
  ) as unknown as MetricsTypeProps;

  return (
    <StyledView horizontal>
      {data &&
        data.map((elem: any, index: number) => (
          <ChartBar
            key={index}
            text={elem.name}
            maxValue={transactionsByType[1].amount}
            height={(elem.amount / transactionsByType[1].amount) * 100}
          />
        ))}
    </StyledView>
  );
}
