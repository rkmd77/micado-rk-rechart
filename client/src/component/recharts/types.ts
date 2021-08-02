export interface CovidCaseType {
  id: string;
  category: string;
  class: string;
  date_last_updated: string;
  indicator_name: string;
  parameter: string;
  series_name: string;
  sub_series_name: string;
  units: string;
  value: string | number;
}

export type setCovidCasesListType = React.Dispatch<React.SetStateAction<CovidCaseType[]>>;
