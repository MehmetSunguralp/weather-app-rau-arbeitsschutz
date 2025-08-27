import { useState } from 'react';

export const useWeatherCondition = () => {
 const [weatherCondition, setWeatherCondition] = useState<string | null>(null);

 const handleWeatherConditionChange = (code: number): void => {
  switch (true) {
   case code === 0:
    setWeatherCondition('Sonnig');
    return;
   case code === 1:
    setWeatherCondition('Überwiegend klar');
    return;
   case code === 2:
    setWeatherCondition('Teilweise bewölkt');
    return;
   case code === 3:
    setWeatherCondition('Bedeckt');
    return;
   case code === 45 || code === 48:
    setWeatherCondition('Nebel');
    return;
   case code >= 51 && code <= 57:
    setWeatherCondition('Nieselregen');
    return;
   case code >= 61 && code <= 67:
    setWeatherCondition('Regen');
    return;
   case code >= 71 && code <= 77:
    setWeatherCondition('Schnee');
    return;
   case code >= 80 && code <= 82:
    setWeatherCondition('Regenschauer');
    return;
   case code >= 85 && code <= 86:
    setWeatherCondition('Schneeschauer');
    return;
   case code === 95:
    setWeatherCondition('Gewitter');
    return;
   case code >= 96 && code <= 99:
    setWeatherCondition('Gewitter mit Hagel');
    return;
   default:
    setWeatherCondition('Unbekannt');
    return;
  }
 };

 return { weatherCondition, handleWeatherConditionChange };
};
