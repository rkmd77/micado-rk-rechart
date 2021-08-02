import RechartComponent from './rechartComponent';
import { INDICATOR_NAME, SUB_SERIES_NAME, RECHART_TYPE } from './constants';
import { CovidCaseType } from './types';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

type PropsFromParent = {
  showButton: boolean;
  covidCasesList: CovidCaseType[]
};

function NumberOfCases(props: PropsFromParent) {
  const { covidCasesList, showButton } = props;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'rechart',
    item: { id: RECHART_TYPE.numberOfCases },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const numberOfCasesData = covidCasesList && covidCasesList.filter((data: CovidCaseType) => data.indicator_name === INDICATOR_NAME.numberOfCases);

  const [selectedSubSeriesName, setSelectedSubSeriesName] = useState<string>(SUB_SERIES_NAME.deceased);

  const handleClick = (seriesName: string) => {
    setSelectedSubSeriesName(seriesName);
  };

  const filteredData = numberOfCasesData && numberOfCasesData.filter((data: CovidCaseType) => data.sub_series_name === selectedSubSeriesName);

  return (
    <div className={`box${isDragging ? ' box-dragged' : ''}`} ref={drag}>
      <div className="box-header">
        <div className="box-header-wrapper">
          <div className="box-header-title">{INDICATOR_NAME.numberOfCases}</div>
          {showButton && (
            <div className="box-header-extra">
              {Object.entries(SUB_SERIES_NAME).map((seriesName) => {
                return (
                  <button className={`box-button${selectedSubSeriesName === seriesName[1] ? ' box-button-actived' : ''}`} key={seriesName[0]} onClick={() => handleClick(seriesName[1])}>
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

export default NumberOfCases;
