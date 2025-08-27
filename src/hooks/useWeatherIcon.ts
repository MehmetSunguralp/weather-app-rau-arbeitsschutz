import { useState } from 'react';
import { weatherIcons } from '../utils/localAssets';

export const useWeatherIcon = () => {
 const [weatherIcon, setWeatherIcon] = useState<string | null>(null);

 const handleWeatherIconChange = (code: number): void => {
  switch (true) {
   case code === 0:
    setWeatherIcon(weatherIcons.sunny);
    return;
   case code === 1:
    setWeatherIcon(weatherIcons.mainlyClear);
    return;
   case code === 2:
    setWeatherIcon(weatherIcons.partlyCloudy);
    return;
   case code === 3:
    setWeatherIcon(weatherIcons.overcast);
    return;
   case code === 45 || code === 48:
    setWeatherIcon(weatherIcons.fog);
    return;
   case code >= 51 && code <= 57:
    setWeatherIcon(weatherIcons.drizzle);
    return;
   case code >= 61 && code <= 67:
    setWeatherIcon(weatherIcons.rain);
    return;
   case code >= 71 && code <= 77:
    setWeatherIcon(weatherIcons.snow);
    return;
   case code >= 80 && code <= 82:
    setWeatherIcon(weatherIcons.rainShowers);
    return;
   case code >= 85 && code <= 86:
    setWeatherIcon(weatherIcons.snowShowers);
    return;
   case code === 95:
    setWeatherIcon(weatherIcons.thunderstorm);
    return;
   case code >= 96 && code <= 99:
    setWeatherIcon(weatherIcons.thunderstormHail);
    return;
   default:
    setWeatherIcon(null);
    return;
  }
 };

 return { weatherIcon, handleWeatherIconChange };
};
