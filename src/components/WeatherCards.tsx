import { useWeatherIcon } from '../hooks/useWeatherIcon';
import { useWeatherCondition } from '../hooks/useWeatherCondition';
import type { WeatherResponse } from '../types/types';
import { Box, Stack, Typography } from '@mui/material';

export const WeatherCards = ({ weatherInfo }: { weatherInfo: WeatherResponse }) => {
 const { getWeatherIcon } = useWeatherIcon();
 const { getWeatherCondition } = useWeatherCondition();

 const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const parts = new Intl.DateTimeFormat('de-DE', {
   weekday: 'long',
   day: 'numeric',
  }).formatToParts(date);

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? '';
  const day = parts.find((p) => p.type === 'day')?.value ?? '';

  return `${weekday} ${day}`;
 };

 return (
  <Stack direction="row" spacing={2} flexWrap="wrap" className="mt-4">
   {weatherInfo.daily.time.slice(1).map((date, i) => {
    const icon = getWeatherIcon(weatherInfo.daily.weathercode[i]);
    const condition = getWeatherCondition(weatherInfo.daily.weathercode[i]);

    return (
     <Box
      key={date}
      sx={{
       borderRadius: 2,
       p: 2,
       minWidth: 160,
       flex: '1 1 160px',
       textAlign: 'center',
       backgroundColor: 'rgba(0, 0, 0, 0.2)',
      }}
      className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
     >
      <Stack spacing={1} alignItems="center">
       <Typography variant="subtitle1" fontWeight={600}>
        {formatDate(date)}
       </Typography>
       {icon && <Box component="img" src={icon} alt={condition} />}

       <Stack direction="row" spacing={1} alignItems="baseline">
        <Typography variant="h6" fontWeight={700}>
         {weatherInfo.daily.temperature_2m_max[i]}°
        </Typography>
        <Typography className="opacity-70" variant="body2">
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
