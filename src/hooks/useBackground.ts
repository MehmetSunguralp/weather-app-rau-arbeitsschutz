import { useState } from 'react';
import { backgroundImages } from '../utils/localAssets';

export const useBackground = () => {
 const [bgImage, setBgImage] = useState<string>(backgroundImages.defaultBg);

 const handleBgChange = (code: number, isDay: number): void => {
  switch (true) {
   case code === 0 && isDay === 0:
    setBgImage(backgroundImages.sunnyNight);
    return;
   case code === 1 && isDay === 0:
    setBgImage(backgroundImages.mainlyClearNight);
    return;
   case code === 2 && isDay === 0:
    setBgImage(backgroundImages.partlyCloudyNight);
    return;
   case code === 3 && isDay === 0:
    setBgImage(backgroundImages.overCastNight);
    return;
   case (code === 45 || code === 48) && isDay === 0:
    setBgImage(backgroundImages.fogNight);
    return;
   case code >= 51 && code <= 57 && isDay === 0:
    setBgImage(backgroundImages.drizzleNight);
    return;
   case code >= 61 && code <= 67 && isDay === 0:
    setBgImage(backgroundImages.rainNight);
    return;
   case code >= 71 && code <= 77 && isDay === 0:
    setBgImage(backgroundImages.snowNight);
    return;
   case code >= 80 && code <= 82 && isDay === 0:
    setBgImage(backgroundImages.rainShowersNight);
    return;
   case code >= 85 && code <= 86 && isDay === 0:
    setBgImage(backgroundImages.snowShowersNight);
    return;
   case code === 95 && isDay === 0:
    setBgImage(backgroundImages.thunderStormNight);
    return;
   case code >= 96 && code <= 99 && isDay === 0:
    setBgImage(backgroundImages.thunderStormHailNight);
    return;
   case code === 0 && isDay === 1:
    setBgImage(backgroundImages.sunny);
    return;
   case code === 1 && isDay === 1:
    setBgImage(backgroundImages.mainlyClear);
    return;
   case code === 2 && isDay === 1:
    setBgImage(backgroundImages.partlyCloudy);
    return;
   case code === 3 && isDay === 1:
    setBgImage(backgroundImages.overCast);
    return;
   case (code === 45 || code === 48) && isDay === 1:
    setBgImage(backgroundImages.fog);
    return;
   case code >= 51 && code <= 57 && isDay === 1:
    setBgImage(backgroundImages.drizzle);
    return;
   case code >= 61 && code <= 67 && isDay === 1:
    setBgImage(backgroundImages.rain);
    return;
   case code >= 71 && code <= 77 && isDay === 1:
    setBgImage(backgroundImages.snow);
    return;
   case code >= 80 && code <= 82 && isDay === 1:
    setBgImage(backgroundImages.rainShowers);
    return;
   case code >= 85 && code <= 86 && isDay === 1:
    setBgImage(backgroundImages.snowShowers);
    return;
   case code === 95 && isDay === 1:
    setBgImage(backgroundImages.thunderStorm);
    return;
   case code >= 96 && code <= 99 && isDay === 1:
    setBgImage(backgroundImages.thunderStormHail);
    return;
   default:
    setBgImage(backgroundImages.defaultBg);
    return;
  }
 };

 return { bgImage, handleBgChange };
};
