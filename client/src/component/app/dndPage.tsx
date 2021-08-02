import { useState } from 'react';
import { useDrop } from 'react-dnd';
import TestPerDay from '../recharts/testPerDay';
import NumberOfCases from '../recharts/numberOfCases';
import { RECHART_TYPE } from '../recharts/constants';
import { CovidCaseType } from '../recharts/types';

type PropsFromParent = {
  covidCasesList: CovidCaseType[];
};
function DndPage(props: PropsFromParent) {
  const { covidCasesList } = props

  const [onBoard, setOnBoard] = useState<string[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'rechart',
    drop: (item: { id: string }) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const addImageToBoard = (id: string) => {
    setOnBoard((onBoard) => [...onBoard, id]);
  };
  return (
    <>
      <div className="grid-dnd-task-list">
        <div className="grid-dnd-task-title">Rechart available</div>
      {!onBoard.includes(RECHART_TYPE.testPerDay) && <TestPerDay showButton={false} covidCasesList={covidCasesList} />}
            {!onBoard.includes(RECHART_TYPE.numberOfCases) && <NumberOfCases showButton={false} covidCasesList={covidCasesList} />}
        
      </div>
      <div className={`grid-dnd-task-target${isOver ? ' target-active' : ''}`} ref={drop}>
      <div className="grid-dnd-task-title">Drop area</div>
      {onBoard.includes(RECHART_TYPE.testPerDay) && <TestPerDay showButton={true} covidCasesList={covidCasesList} />}
            {onBoard.includes(RECHART_TYPE.numberOfCases) && <NumberOfCases showButton={true} covidCasesList={covidCasesList} />}
      </div>
    </>
  );
}

export default DndPage;
