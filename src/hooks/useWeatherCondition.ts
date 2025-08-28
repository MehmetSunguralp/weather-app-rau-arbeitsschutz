export const useWeatherCondition = () => {
 const getWeatherCondition = (code: number): string => {
  switch (true) {
   case code === 0:
    return 'Sonnig';
   case code === 1:
    return 'Überwiegend klar';
   case code === 2:
    return 'Teilweise bewölkt';
   case code === 3:
    return 'Bedeckt';
   case code === 45 || code === 48:
    return 'Nebel';
   case code >= 51 && code <= 57:
    return 'Nieselregen';
   case code >= 61 && code <= 67:
    return 'Regen';
   case code >= 71 && code <= 77:
    return 'Schnee';
   case code >= 80 && code <= 82:
    return 'Regenschauer';
   case code >= 85 && code <= 86:
    return 'Schneeschauer';
   case code === 95:
    return 'Gewitter';
   case code >= 96 && code <= 99:
    return 'Gewitter mit Hagel';
   default:
    return 'Unbekannt';
  }
 };

 return { getWeatherCondition };
};
