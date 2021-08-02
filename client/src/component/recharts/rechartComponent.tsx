import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid, TooltipProps } from 'recharts';
import { CovidCaseType } from './types';

export type ValueType = number | string | Array<number | string>;
export type NameType = number | string;

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
        <p>{payload?.[0]?.value || '0'} cases</p>
      </div>
    );
  }

  return null;
};

type PropsFromParent = {
  data: CovidCaseType[];
  thumbnail: boolean;
};

function RechartComponent(props: PropsFromParent) {
  const { data, thumbnail } = props;

  return (
    <ResponsiveContainer width="99%" height={thumbnail?200:400}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area type="monotone" dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <XAxis dataKey="parameter" axisLine={false} tickLine={false} />
        <YAxis dataKey="value" type="number" domain={[0, 'dataMax + 10']} />


        <Tooltip content={<CustomTooltip />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RechartComponent;
