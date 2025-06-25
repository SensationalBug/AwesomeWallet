import React, {useContext} from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';
import {MetricsContext} from '../context/MetricsContext';

const Chart = ({data}: ChartProps) => {
  const {totalCredit} = useContext(MetricsContext);
  const maxHeight = 160;
  return (
    <StyledView horizontal>
      {data &&
        data.map((elem: any, index: number) => (
          <ChartBar
            key={index}
            text={elem.name}
            maxValue={totalCredit}
            maxHeight={maxHeight}
            height={(elem.amount / totalCredit) * maxHeight}
          />
        ))}
    </StyledView>
  );
};

export default Chart;
