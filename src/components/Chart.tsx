import React from 'react';
import ChartBar from './charts/ChartBar';
import StyledView from './custom/StyledView';

export default function Chart({data}: any) {
  return (
    <StyledView horizontal>
      {data &&
        data.map((elem: any, index: number) => (
          <ChartBar
            key={index}
            text={elem.name}
            height={(elem.amount / 150) * 100}
          />
        ))}
    </StyledView>
  );
}
