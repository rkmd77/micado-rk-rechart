import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DndPage from './dndPage';
import { useState, useEffect } from 'react';
import { CovidCaseType } from '../recharts/types';
import Header from './header';

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [covidCasesList, setCovidCasesList] = useState<CovidCaseType[]>([]);

  const getCovidCases = () => {
    fetch('cases')
      .then((res) => res.json())
      .then((covidCasesList) => setCovidCasesList(covidCasesList));
  };

  useEffect(() => {
    getCovidCases();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid-dnd">
        <Header setCovidCasesList={setCovidCasesList} />
        <DndPage covidCasesList={covidCasesList} />
      </div>
    </DndProvider>
  );
}

export default App;
