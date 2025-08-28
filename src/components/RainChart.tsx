import { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Button } from '@mui/material';
import type { WeatherResponse } from '../types/types';

export const RainChart = ({ weatherInfo }: { weatherInfo: WeatherResponse }) => {
 const [selectedDayIndex, setSelectedDayIndex] = useState(0);
 const [hours, setHours] = useState<string[]>([]);
 const [rainData, setRainData] = useState<number[]>([]);

 useEffect(() => {
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

 return (
  <Box
   className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] p-4 rounded-xl mt-4"
   sx={{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
   }}
  >
   <LineChart
    series={[
     {
      data: rainData,
      label: 'Rainfall (%)',
      showMark: false,
      color: '#0BAEFF',
     },
    ]}
    xAxis={[
     {
      data: hours,
      scaleType: 'point',
     },
    ]}
    height={140}
    sx={{
     '& .MuiChartsAxis-line': {
      stroke: '#FFFFFF',
      opacity: '0.5',
     },
     '& .MuiChartsAxis-tick': {
      display: 'none',
     },
     '& .MuiChartsAxis-tickLabel': {
      fill: '#FFFFFF',
      fontSize: '12px',
     },
     '& .MuiChartsLegend-label': {
      fill: '#FFFFFF',
     },
     '& .MuiChartsLabelMark-fill': {
      fill: '#0BAEFF',
     },
     '& .MuiLineElement-root': {
      stroke: '#0BAEFF',
     },
    }}
   />

   <Box display="flex" gap={1}>
    {weatherInfo.daily.time.map((day, idx) => (
     <Button
      key={day}
      variant={idx === selectedDayIndex ? 'contained' : 'outlined'}
      onClick={() => setSelectedDayIndex(idx)}
     >
      {day}
     </Button>
    ))}
   </Box>
  </Box>
 );
};
