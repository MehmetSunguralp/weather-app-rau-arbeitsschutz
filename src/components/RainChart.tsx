import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box } from '@mui/material';
import type { WeatherResponse } from '../types/types';

interface RainChartProps {
 weatherInfo: WeatherResponse;
 selectedDayIndex: number;
}

export const RainChart: React.FC<RainChartProps> = ({ weatherInfo, selectedDayIndex }) => {
 const [hours, setHours] = useState<string[]>([]);
 const [rainData, setRainData] = useState<number[]>([]);
 const [currentWeatherInfo, setCurrentWeatherInfo] = useState<WeatherResponse>(weatherInfo);

 useEffect(() => {
  if (weatherInfo !== currentWeatherInfo) {
   setCurrentWeatherInfo(weatherInfo);
  }
  const day = weatherInfo.daily.time[selectedDayIndex];
  const hourlyTimes = weatherInfo.hourly.time
   .map((t, i) => ({ t, rain: weatherInfo.hourly.precipitation[i] }))
   .filter(({ t }) => t.startsWith(day));

  const hourLabels = hourlyTimes.map(({ t }) => t.split('T')[1]);
  const maxDailyRain = Math.max(...weatherInfo.daily.precipitation_sum);
  const hourlyRainPercentage = hourlyTimes.map(({ rain }) =>
   maxDailyRain ? Number(((rain / maxDailyRain) * 100).toFixed(1)) : 0
  );

  setHours(hourLabels);
  setRainData(hourlyRainPercentage);
 }, [selectedDayIndex, weatherInfo]);

 const customChartStyles: object = {
  '& .MuiChartsAxis-line': {
   stroke: '#FFFFFF !important',
   opacity: '0.2',
  },
  '& .MuiChartsLabel-root': {
   color: '#FFFFFF !important',
   fontSize: '16px !important',
  },
  '& .MuiChartsAxis-tick': {
   display: 'none !important',
  },
  '& .MuiChartsAxis-tickLabel': {
   fill: '#FFFFFF !important',
   fontSize: '12px !important',
  },
  '& .MuiChartsLegend-label': {
   fill: '#FFFFFF !important',
  },
  '& .MuiChartsLabelMark-fill': {
   fill: '#0BAEFF !important',
  },
  '& .MuiLineElement-root': {
   stroke: '#0BAEFF !important',
  },
 };

 return (
  <Box
   className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] p-2 sm:p-4 rounded-xl mt-4 max-w-[1200px] w-full"
   sx={{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    minWidth: 0,
    width: '100%',
    maxWidth: { xs: '100%', sm: '1200px' },
    overflowX: 'auto',
    marginBottom: { xs: 6, sm: 4, md: 0 },
   }}
  >
   <LineChart
    series={[
     {
      data: rainData,
      label: 'Niederschlag  (%)',
      showMark: false,
      color: 'rgba(11, 174, 255, 0.2)',
      area: true,
      baseline: 0,
     },
    ]}
    xAxis={[
     {
      data: hours,
      scaleType: 'point',
      tickLabelStyle: { fontSize: 10 },
     },
    ]}
    height={140}
    width={undefined}
    sx={{
     ...customChartStyles,
     '.MuiChartsLabel-root': {
      color: '#FFFFFF !important',
      fontSize: { xs: '12px !important', sm: '16px !important' },
     },
     '.MuiChartsAxis-tickLabel': {
      fill: '#FFFFFF !important',
      fontSize: { xs: '10px !important', sm: '12px !important' },
     },
    }}
    margin={{ left: -20, right: 10, top: 10, bottom: 10 }}
    grid={{ vertical: true, horizontal: true }}
   />
  </Box>
 );
};
