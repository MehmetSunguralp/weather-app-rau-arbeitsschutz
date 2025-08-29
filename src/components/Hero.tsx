import { Box, Typography } from '@mui/material';
import type { WeatherResponse } from '../types/types';
import { useEffect, useState } from 'react';
import { useWeatherIcon } from '../hooks/useWeatherIcon';
import { useWeatherCondition } from '../hooks/useWeatherCondition';

export const Hero = ({ weatherInfo }: { weatherInfo: WeatherResponse | null }) => {
 const [unit, setUnit] = useState<'celcius' | 'fahrenheit'>('celcius');
 const [weatherIcon, setWeatherIcon] = useState<string | null>(null);
 const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
 const [lastUpdate, setLastUpdate] = useState<string | null>(null);
 const { getWeatherIcon } = useWeatherIcon();
 const { getWeatherCondition } = useWeatherCondition();

 useEffect(() => {
  if (weatherInfo) {
   setWeatherIcon(getWeatherIcon(weatherInfo.current.weather_code));
   setWeatherCondition(getWeatherCondition(weatherInfo.current.weather_code));
   const updateTime = new Date(weatherInfo.current.time);
   const formattedUpdate = updateTime.toLocaleString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
   });
   setLastUpdate(formattedUpdate);
  }
  console.log(weatherInfo?.daily.time[0]);
 }, [weatherInfo]);

 return (
  <Box
   className="mt-4 flex flex-col text-center justify-center rounded-3xl px-16 py-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
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
   <Typography variant="body2" className="opacity-70 mb-2">
    Letztes Update: {lastUpdate}
   </Typography>
  </Box>
 );
};
