import { Box, Typography } from '@mui/material';
import type { WeatherResponse } from '../types/types';
import { useEffect, useState } from 'react';
import { useWeatherIcon } from '../hooks/useWeatherIcon';
import { useWeatherCondition } from '../hooks/useWeatherCondition';

export const Hero = ({ weatherInfo }: { weatherInfo: WeatherResponse | null }) => {
 const [unit, setUnit] = useState<'celcius' | 'fahrenheit'>('celcius');
 const { weatherIcon, handleWeatherIconChange } = useWeatherIcon();
 const { weatherCondition, handleWeatherConditionChange } = useWeatherCondition();

 useEffect(() => {
  if (weatherInfo) {
   handleWeatherIconChange(weatherInfo.current.weather_code);
   handleWeatherConditionChange(weatherInfo.current.weather_code);
  }
 }, [weatherInfo]);

 return (
  <Box
   className="mt-4 flex flex-col text-center justify-center rounded-3xl p-4"
   sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
  >
   <Typography variant="h4">{weatherInfo?.placeName}</Typography>
   <Box className="flex justify-center items-end gap-8">
    <Box className="flex gap-4">
     <Typography variant="h1">{weatherInfo?.current.temperature_2m}&deg;</Typography>

     <Box component={'span'} className="flex flex-col justify-center">
      <Typography variant="h5" sx={{ opacity: unit === 'fahrenheit' ? 0.4 : 1 }}>
       C
      </Typography>

      <Typography variant="h5" sx={{ opacity: unit === 'celcius' ? 0.4 : 1 }}>
       F
      </Typography>
     </Box>
    </Box>

    <Box className="flex flex-col justify-between items-center">
     {weatherIcon && <Box component={'img'} src={weatherIcon} className="w-full max-w-[120px]" />}
     {weatherCondition && <Typography variant="h5">{weatherCondition}</Typography>}
    </Box>
   </Box>
   {weatherInfo && (
    <Typography variant="body1" className="opacity-75">
     {`Wind: ${Math.round(weatherInfo.current.wind_speed_10m * 3.6)}km/h | Luftfeuchtigkeit: ${
      weatherInfo.current.relative_humidity_2m
     }%`}
    </Typography>
   )}
  </Box>
 );
};
