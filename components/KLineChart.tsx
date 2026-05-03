"use client";

import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Scatter
} from 'recharts';

interface KLineData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface PredictionPoint {
  date: string;
  price: number;
}

interface KLineChartProps {
  data: KLineData[];
  prediction: PredictionPoint;
  currentPrice: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPrediction = data.isPrediction;

    return (
      <div className="bg-[#1a1a2e] border border-white/10 p-3 rounded-lg shadow-xl text-sm">
        <p className="text-gray-400 mb-1">{data.date}</p>
        {isPrediction ? (
          <p className="text-success font-bold">預測目標價: ${data.close.toFixed(2)}</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-gray-500">開盤:</span> <span className="text-white">${data.open.toFixed(2)}</span>
            <span className="text-gray-500">最高:</span> <span className="text-white">${data.high.toFixed(2)}</span>
            <span className="text-gray-500">最低:</span> <span className="text-white">${data.low.toFixed(2)}</span>
            <span className="text-gray-500">收盤:</span> <span className={data.close >= data.open ? 'text-success' : 'text-danger'}>${data.close.toFixed(2)}</span>
            <span className="text-gray-500">成交量:</span> <span className="text-gray-300">{data.volume.toLocaleString()}</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const Candle = (props: any) => {
  const { x, y, width, height, low, high, open, close } = props;
  const isUp = close >= open;
  const color = isUp ? '#22c55e' : '#ef4444';
  const ratio = Math.abs(height) / Math.abs(low - high);

  return (
    <g>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={y - (open > close ? 0 : height) + (high - Math.max(open, close)) * ratio}
        x2={x + width / 2}
        y2={y - (open > close ? 0 : height) + (high - Math.min(open, close)) * ratio}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
      />
    </g>
  );
};

export default function KLineChart({ data, prediction, currentPrice }: KLineChartProps) {
  // Combine historical and prediction
  const chartData = [
    ...data.map(d => ({
      ...d,
      // For Recharts Bar, the y-axis value is the bottom, height is the size
      // We use 'close' and 'open' to determine the rect
      displayY: Math.max(d.open, d.close),
      displayHeight: Math.abs(d.open - d.close) || 0.1, // Ensure some height
      isPrediction: false
    })),
    {
      date: prediction.date,
      open: prediction.price,
      close: prediction.price,
      high: prediction.price,
      low: prediction.price,
      displayY: prediction.price,
      displayHeight: 0,
      isPrediction: true
    }
  ];

  // Calculate Y domain with some padding
  const allPrices = [...data.map(d => [d.high, d.low]).flat(), prediction.price];
  const minPrice = Math.min(...allPrices) * 0.98;
  const maxPrice = Math.max(...allPrices) * 1.02;

  return (
    <div className="w-full h-full min-h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#666" 
            tick={{ fill: '#888', fontSize: 10 }} 
            tickFormatter={(str) => str.split('-').slice(1).join('/')}
          />
          <YAxis 
            domain={[minPrice, maxPrice]} 
            stroke="#666" 
            tick={{ fill: '#888', fontSize: 10 }}
            orientation="right"
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Candlesticks */}
          <Bar
            dataKey="displayHeight"
            fill="#8884d8"
            shape={(props: any) => {
              const { x, y, width, height, payload } = props;
              if (payload.isPrediction) return <rect />;
              return (
                <Candle 
                  x={x} 
                  y={y} 
                  width={width} 
                  height={height} 
                  low={payload.low} 
                  high={payload.high} 
                  open={payload.open} 
                  close={payload.close} 
                />
              );
            }}
          />

          {/* Prediction Point */}
          <Scatter
            data={chartData.filter(d => d.isPrediction)}
            fill="#00f0ff"
          >
            {chartData.filter(d => d.isPrediction).map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#00f0ff" />
            ))}
          </Scatter>

          {/* Current Price Line */}
          <ReferenceLine 
            y={currentPrice} 
            stroke="#eab308" 
            strokeDasharray="5 5" 
            label={{ position: 'left', value: `現價: ${currentPrice}`, fill: '#eab308', fontSize: 12 }} 
          />

          {/* Prediction Path (Line from last real point to prediction) */}
          <Line
            type="monotone"
            dataKey="close"
            stroke="#00f0ff"
            strokeDasharray="3 3"
            strokeWidth={1}
            dot={false}
            activeDot={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
