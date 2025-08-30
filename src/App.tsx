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
 const [bgLoading, setBgLoading] = useState<boolean>(true); // 👈 track bg image load
 const [selectedDayIndex, setSelectedDayIndex] = useState(0);
 const [hoverDayIndex, setHoverDayIndex] = useState<number | null>(null);
 const [unit, setUnit] = useState<string>('celsius');

 const { bgImage, handleBgChange } = useBackground();

 // Handle weather changes
 useEffect(() => {
  if (weatherInfo?.current.weather_code !== undefined) {
   handleBgChange(weatherInfo.current.weather_code, weatherInfo.current.is_day);
  }
 }, [weatherInfo, isLoading]);

 // Preload background image
 useEffect(() => {
  if (!bgImage) return;
  setBgLoading(true);
  const img = new Image();
  img.src = bgImage;
  img.onload = () => setBgLoading(false);
 }, [bgImage]);

 return (
  <Box
   className="flex justify-center min-h-screen bg-cover bg-center"
   style={{ backgroundImage: !bgLoading ? `url('${bgImage}')` : 'none' }}
  >
   {/* Loader for either API fetch or background preload */}
   <Backdrop open={isLoading || bgLoading}>
    <CircularProgress size={100} />
   </Backdrop>

   {/* Only render app after background loaded */}
   {!bgLoading && (
    <Box
     className="w-full mx-auto flex flex-col justify-center items-center min-h-screen px-2 sm:px-4"
     sx={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(3px)',
      boxShadow: 3,
      p: { xs: 1, sm: 2, md: 4 },
      minHeight: { xs: '100vh', sm: '100vh' },
     }}
    >
     <Box className="text-center mb-4 flex flex-wrap items-end gap-2 absolute right-6 bottom-0 opacity-70">
      <Typography className="font-extrabold text-sm sm:text-base md:text-lg lg:text-xl">Wetter-App</Typography>

      <Link
       href="https://github.com/MehmetSunguralp"
       target="_blank"
       className="text-xs sm:text-sm md:text-base lg:text-lg"
      >
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
       selectedDayIndex={selectedDayIndex}
       setSelectedDayIndex={setSelectedDayIndex}
       hoverDayIndex={hoverDayIndex}
       setHoverDayIndex={setHoverDayIndex}
      />
     )}

     {weatherInfo && (
      <WeatherCards
       weatherInfo={weatherInfo}
       selectedDayIndex={selectedDayIndex}
       setSelectedDayIndex={setSelectedDayIndex}
       hoverDayIndex={hoverDayIndex}
       setHoverDayIndex={setHoverDayIndex}
       showToday={false}
      />
     )}

     {weatherInfo && <RainChart weatherInfo={weatherInfo} selectedDayIndex={hoverDayIndex ?? selectedDayIndex} />}
    </Box>
   )}
  </Box>
 );
};
