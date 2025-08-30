import { useEffect, useState } from 'react';
import { SearchBox } from './components/SearchBox';
import type { WeatherResponse } from './types/types';
import { Backdrop, Box, CircularProgress, Link, Typography } from '@mui/material';
import { useBackground } from './hooks/useBackground';
import { Hero } from './components/Hero';
import { WeatherCards } from './components/WeatherCards';
import { RainChart } from './components/RainChart';

export const App = () => {
 const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | null>(null);
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [selectedDayIndex, setSelectedDayIndex] = useState(0);
 const [hoverDayIndex, setHoverDayIndex] = useState<number | null>(null);
 const [unit, setUnit] = useState<string>('celsius');

 const { bgImage, handleBgChange } = useBackground();

 useEffect(() => {
  if (weatherInfo?.current.weather_code) handleBgChange(weatherInfo?.current.weather_code);
  console.log(weatherInfo);
 }, [weatherInfo, isLoading]);

 return (
  <Box
   className="flex justify-center min-h-screen bg-cover bg-center"
   style={{ backgroundImage: `url('${bgImage}')` }}
   sx={{
    '@media (max-width: 600px)': {
     minHeight: '100vh',
     padding: 0,
    },
   }}
  >
   <Backdrop open={isLoading}>
    <CircularProgress size={100} />
   </Backdrop>

   <Box
    className="w-full max-w-[1400px] mx-auto flex flex-col justify-center items-center min-h-screen px-2 sm:px-4"
    sx={{
     backgroundColor: 'rgba(0, 0, 0, 0.7)',
     backdropFilter: 'blur(3px)',
     boxShadow: 3,
     p: { xs: 1, sm: 2, md: 4 },
     minHeight: { xs: '100vh', sm: '100vh' },
    }}
   >
    <Box className="text-center mb-4 flex items-end gap-2 absolute right-6 bottom-0 opacity-70">
     <Typography variant="h5" className="font-extrabold">
      Wetter-App
     </Typography>

     <Link href="https://github.com/MehmetSunguralp" target="_blank" variant="h6">
      von Mehmet Sunguralp
     </Link>
    </Box>

    <SearchBox
     setWeatherInfo={setWeatherInfo}
     setIsLoading={setIsLoading}
     setSelectedDayIndex={setSelectedDayIndex}
     unit={unit}
    />

    {weatherInfo && (
     <Hero
      weatherInfo={weatherInfo}
      setIsLoading={setIsLoading}
      setWeatherInfo={setWeatherInfo}
      unit={unit}
      setUnit={setUnit}
     />
    )}

    {weatherInfo && (
     <WeatherCards
      weatherInfo={weatherInfo}
      selectedDayIndex={selectedDayIndex}
      setSelectedDayIndex={setSelectedDayIndex}
      hoverDayIndex={hoverDayIndex}
      setHoverDayIndex={setHoverDayIndex}
     />
    )}

    {weatherInfo && <RainChart weatherInfo={weatherInfo} selectedDayIndex={hoverDayIndex ?? selectedDayIndex} />}
   </Box>
  </Box>
 );
};
