"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface AttributionChartProps {
  weights: {
    chips: number;
    fundamentals: number;
    geopolitics: number;
  };
  lang?: string;
}

export default function AttributionChart({ weights, lang = 'zh' }: AttributionChartProps) {
  const data = [
    { name: lang === 'zh' ? '籌碼維度' : (lang === 'en' ? 'Chips' : '需給'), value: weights.chips },
    { name: lang === 'zh' ? '基本面' : (lang === 'en' ? 'Fundamentals' : 'ファンダ'), value: weights.fundamentals },
    { name: lang === 'zh' ? '地緣政治' : (lang === 'en' ? 'Geopolitics' : '地政学'), value: weights.geopolitics }
  ];

  const COLORS = ["#00f0ff", "#00ff9d", "#ff00ff"];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0a0a12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
