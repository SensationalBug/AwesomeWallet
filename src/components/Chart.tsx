import React, {useContext} from 'react';
import ChartBar from './charts/ChartBar';
import {ChartProps} from '../types/Types';
import StyledView from './custom/StyledView';
import {MetricsContext} from '../context/MetricsContext';

const Chart = ({data}: ChartProps) => {
  const {totalCredit} = useContext(MetricsContext);

  return (
    <StyledView horizontal>
      {data &&
        data.map((elem: any, index: number) => (
          <ChartBar
            key={index}
            text={elem.name}
            maxValue={totalCredit}
            height={(elem.amount / totalCredit) * 100}
          />
        ))}
    </StyledView>
  );
};

export default Chart;
