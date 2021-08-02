import { useState } from 'react';
import DatePicker from 'react-datepicker'
import { setCovidCasesListType } from '../recharts/types';
import "react-datepicker/dist/react-datepicker.css";

type PropsFromParent = {
  setCovidCasesList: setCovidCasesListType;
};

function Header(props: PropsFromParent) {
  const { setCovidCasesList } = props

  const [startDate, setStartDate] = useState(new Date('03/01/2020'));
  const [endDate, setEndDate] = useState(new Date('02/15/2021'));
  const [startDateNumber, setStartDateNumber] = useState('');
  const [endDateNumber, setEndDateNumber] = useState('');

  const onChange = (dates:any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if(start){
      setStartDateNumber(start.getTime())
    }
    if(end){
      setEndDateNumber(end.getTime())
    }
  };

const handleSearch = () => {
  let query = 'cases'
  if(startDate && endDate){
    query = 'cases/?' + new URLSearchParams({
      dateFrom: startDateNumber,
      dateTo: endDateNumber
    })
  }

  if(query){

    fetch(query)
    .then((res) => res.json())
    .then((covidCasesList) => 
      setCovidCasesList(covidCasesList)
    );
  }
  
}

  return (
    <header>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
      selectsRange
    />
    <button className="box-button button-search" onClick={handleSearch}>Search</button>
    </header>
  );
};

export default Header;