import { weatherIcons } from '../utils/localAssets';

export const useWeatherIcon = () => {
 const getWeatherIcon = (code: number): string | null => {
  switch (true) {
   case code === 0:
    return weatherIcons.sunny;
   case code === 1:
    return weatherIcons.mainlyClear;
   case code === 2:
    return weatherIcons.partlyCloudy;
   case code === 3:
    return weatherIcons.overcast;
   case code === 45 || code === 48:
    return weatherIcons.fog;
   case code >= 51 && code <= 57:
    return weatherIcons.drizzle;
   case code >= 61 && code <= 67:
    return weatherIcons.rain;
   case code >= 71 && code <= 77:
    return weatherIcons.snow;
   case code >= 80 && code <= 82:
    return weatherIcons.rainShowers;
   case code >= 85 && code <= 86:
    return weatherIcons.snowShowers;
   case code === 95:
    return weatherIcons.thunderstorm;
   case code >= 96 && code <= 99:
    return weatherIcons.thunderstormHail;
   default:
    return null;
  }
 };

 return { getWeatherIcon };
};
