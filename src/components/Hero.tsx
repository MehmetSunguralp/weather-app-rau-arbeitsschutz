import { Box, Typography } from '@mui/material';
import type { PlaceDetail, WeatherResponse } from '../types/types';
import { useEffect, useState } from 'react';
import { useWeatherIcon } from '../hooks/useWeatherIcon';
import { useWeatherCondition } from '../hooks/useWeatherCondition';
import { getWeatherByCoords } from '../api/apiCalls';

export const Hero = ({
 weatherInfo,
 unit,
 setUnit,
 setIsLoading,
 setWeatherInfo,
}: {
 weatherInfo: WeatherResponse | null;
 unit: string;
 setUnit: (idx: string) => void;
 setIsLoading: (idx: boolean) => void;
 setWeatherInfo: (idx: WeatherResponse) => void;
}) => {
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
 }, [weatherInfo]);

 const handleUnitChange = async () => {
  if (weatherInfo) {
   setIsLoading(true);
   const weatherResponse = await getWeatherByCoords(weatherInfo.latitude, weatherInfo.longitude, unit);
   if (weatherResponse.state === 'success' && weatherResponse.data) {
    setWeatherInfo({
     ...weatherInfo,
     ...weatherResponse.data,
    });

    setIsLoading(false);
   } else {
    setIsLoading(false);
   }
  }
 };

 useEffect(() => {
  handleUnitChange();
 }, [unit]);

 return (
  <Box
   className="mt-4 flex flex-col text-center justify-center rounded-3xl px-4 sm:px-8 md:px-16 py-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
   sx={{
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: { xs: '100%', sm: '90%', md: 'auto' },
    maxWidth: 600,
    marginX: 'auto',
   }}
  >
   <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2.125rem' } }}>
    {weatherInfo?.placeName}
   </Typography>
   <Box className="flex justify-center items-center sm:items-end gap-4 sm:gap-50 w-full">
    <Box className="flex gap-2 sm:gap-4 items-center justify-center">
     <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' } }}>
      {weatherInfo?.current.temperature_2m}&deg;
     </Typography>

     <Box component={'span'} className="flex flex-col justify-center">
      <Typography
       className="cursor-pointer"
       variant="h6"
       sx={{ opacity: unit === 'fahrenheit' ? 0.4 : 1, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
       onClick={() => setUnit('celsius')}
      >
       C
      </Typography>
      <Typography
       className="cursor-pointer"
       variant="h6"
       sx={{ opacity: unit === 'celsius' ? 0.4 : 1, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
       onClick={() => setUnit('fahrenheit')}
      >
       F
      </Typography>
     </Box>
    </Box>

    <Box className="flex flex-col justify-between items-center sm:mt-0">
     {weatherIcon && (
      <Box
       component={'img'}
       src={weatherIcon}
       className="w-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] h-[80px] sm:h-[100px] md:h-[120px]"
      />
     )}
     {weatherCondition && (
      <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
       {weatherCondition}
      </Typography>
     )}
    </Box>
   </Box>
   {weatherInfo && (
    <Typography variant="body2" className="opacity-75" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
     {`Wind: ${Math.round(weatherInfo.current.wind_speed_10m * 3.6)}km/h | Luftfeuchtigkeit: ${
      weatherInfo.current.relative_humidity_2m
     }%`}
    </Typography>
   )}
   <Typography variant="body2" className="opacity-70 mb-2" sx={{ fontSize: { xs: '0.8rem', sm: '0.95rem' } }}>
    Letztes Update: {lastUpdate}
   </Typography>
  </Box>
 );
};
