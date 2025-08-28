import { useEffect, useState } from 'react';
import { SearchBox } from './components/SearchBox';
import type { WeatherResponse } from './types/types';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import { useBackground } from './hooks/useBackground';
import { Hero } from './components/Hero';
import { WeatherCards } from './components/WeatherCards';

export const App = () => {
 const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false);

 const { bgImage, handleBgChange } = useBackground();

 useEffect(() => {
  if (weatherInfo?.current.weather_code) handleBgChange(weatherInfo?.current.weather_code);
  console.log(weatherInfo);
 }, [weatherInfo, isLoading]);

 return (
  <Box className="flex justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
   <Backdrop open={isLoading}>
    <CircularProgress size={100} />
   </Backdrop>
   <Box
    className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center min-h-screen"
    sx={{
     backgroundColor: 'rgba(0, 0, 0, 0.6)',
     boxShadow: 3,
     p: 4,
    }}
   >
    <SearchBox setWeatherInfo={setWeatherInfo} setIsLoading={setIsLoading} />
    <Hero weatherInfo={weatherInfo} />
    {weatherInfo && <WeatherCards weatherInfo={weatherInfo} />}
   </Box>
  </Box>
 );
};
