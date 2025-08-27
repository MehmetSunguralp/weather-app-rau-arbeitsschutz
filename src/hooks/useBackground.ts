import { useState } from 'react';
import { backgroundImages } from '../utils/localAssets';

export const useBackground = () => {
 const [bgImage, setBgImage] = useState(backgroundImages.defaultBg);

 const handleBgChange = (code: number): void => {
  switch (true) {
   case code === 0:
    setBgImage(backgroundImages.sunny);
    return;
   case code === 1:
    setBgImage(backgroundImages.mainlyClear);
    return;
   case code === 2:
    setBgImage(backgroundImages.partlyCloudy);
    return;
   case code === 3:
    setBgImage(backgroundImages.overCast);
    return;
   case code === 45 || code === 48:
    setBgImage(backgroundImages.fog);
    return;
   case code >= 51 && code <= 57:
    setBgImage(backgroundImages.drizzle);
    return;
   case code >= 61 && code <= 67:
    setBgImage(backgroundImages.rain);
    return;
   case code >= 71 && code <= 77:
    setBgImage(backgroundImages.snow);
    return;
   case code >= 80 && code <= 82:
    setBgImage(backgroundImages.rainShowers);
    return;
   case code >= 85 && code <= 86:
    setBgImage(backgroundImages.snowShowers);
    return;
   case code === 95:
    setBgImage(backgroundImages.thunderStorm);
    return;
   case code >= 96 && code <= 99:
    setBgImage(backgroundImages.thunderStormHail);
    return;
   default:
    setBgImage(backgroundImages.defaultBg);
    return;
  }
 };

 return { bgImage, handleBgChange };
};
