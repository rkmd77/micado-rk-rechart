import RechartComponent from './rechartComponent';
import { INDICATOR_NAME, SERIES_NAME, RECHART_TYPE } from './constants';
import { CovidCaseType } from './types';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

type PropsFromParent = {
  showButton: boolean;
  covidCasesList: CovidCaseType[]
};

function TestPerDay(props: PropsFromParent) {
  const { covidCasesList, showButton } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'rechart',
    item: { id: RECHART_TYPE.testPerDay },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const testPerDayData = covidCasesList && covidCasesList.filter((data: CovidCaseType) => data.indicator_name === INDICATOR_NAME.testPerDay);

  const [selectedSeriesName, setSelectedSeriesName] = useState<string>(SERIES_NAME.testByDay);

  const handleClick = (seriesName: string) => {
    setSelectedSeriesName(seriesName);
  };

  const filteredData = testPerDayData && testPerDayData.filter((data: CovidCaseType) => data.series_name === selectedSeriesName);

  return (
    <div className={`box${isDragging ? ' box-dragged' : ''}`} ref={drag}>
      <div className="box-header">
        <div className="box-header-wrapper">
          <div className="box-header-title">{INDICATOR_NAME.testPerDay}</div>
          {showButton && (
            <div className="box-header-extra">
              {Object.entries(SERIES_NAME).map((seriesName) => {
                return (
                  <button className={`box-button${selectedSeriesName === seriesName[1] ? ' box-button-actived' : ''}`} key={seriesName[0]} onClick={() => handleClick(seriesName[1])}>
                    {seriesName[1]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="box-body">
        <RechartComponent data={filteredData} thumbnail={!showButton} />
      </div>
    </div>
  );
}

export default TestPerDay;
