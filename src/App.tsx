import { useEffect, useState } from 'react';
import { SearchBox } from './components/SearchBox';
import type { WeatherResponse } from './types/types';

export const App = () => {
 const [weatherInfo, setWeatherInfo] = useState<WeatherResponse | null>(null);

 useEffect(() => {
  console.log(weatherInfo);
 }, [weatherInfo]);
 return (
  <>
   <SearchBox setWeatherInfo={setWeatherInfo} />
  </>
 );
};
