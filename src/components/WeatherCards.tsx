import { useWeatherIcon } from '../hooks/useWeatherIcon';
import { useWeatherCondition } from '../hooks/useWeatherCondition';
import type { WeatherResponse } from '../types/types';
import { formatDate } from '../utils/commonFunctions';
import { Box, Stack, Typography } from '@mui/material';
import type React from 'react';

interface WeatherCardsProps {
 weatherInfo: WeatherResponse;
 selectedDayIndex: number;
 setSelectedDayIndex: (idx: number) => void;
 setHoverDayIndex: (idx: number | null) => void;
}

export const WeatherCards: React.FC<WeatherCardsProps> = ({
 weatherInfo,
 selectedDayIndex,
 setSelectedDayIndex,
 setHoverDayIndex,
}) => {
 const { getWeatherIcon } = useWeatherIcon();
 const { getWeatherCondition } = useWeatherCondition();

 return (
  <Stack direction="row" spacing={2} flexWrap="wrap" className="mt-4 max-w-[1200px] w-full">
   {weatherInfo.daily.time.slice(1).map((date, i) => {
    const icon = getWeatherIcon(weatherInfo.daily.weathercode[i]);
    const condition = getWeatherCondition(weatherInfo.daily.weathercode[i]);

    return (
     <Box
      className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
      key={date}
      sx={{
       borderRadius: 2,
       p: 2,
       minWidth: 160,
       flex: '1 1 160px',
       textAlign: 'center',
       backgroundColor: i === selectedDayIndex ? 'rgba(11,174,255,0.2)' : 'rgba(0, 0, 0, 0.2)',
       cursor: 'pointer',
      }}
      onMouseEnter={() => setHoverDayIndex(i)}
      onMouseLeave={() => setHoverDayIndex(null)}
      onClick={() => setSelectedDayIndex(i)}
     >
      <Stack alignItems="center">
       <Typography variant="subtitle1" fontWeight={600}>
        {formatDate(date)}
       </Typography>
       {icon && <Box component="img" src={icon} alt={condition} />}

       <Stack direction="row" spacing={1} alignItems="baseline">
        <Typography variant="h6" fontWeight={700}>
         {weatherInfo.daily.temperature_2m_max[i]}°
        </Typography>
        <Typography className="opacity-70" variant="body1">
         {weatherInfo.daily.temperature_2m_min[i]}°
        </Typography>
       </Stack>

       <Typography variant="body1" className="opacity-70 h-[2lh] flex items-center">
        {condition}
       </Typography>
      </Stack>
     </Box>
    );
   })}
  </Stack>
 );
};
