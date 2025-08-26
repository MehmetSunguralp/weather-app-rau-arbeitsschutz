import { useState } from 'react';
import { defaultBg } from '../utils/bgImages';

export const useBackground = () => {
 const [bgImage, setBgImage] = useState(defaultBg);
 const handleBgChange = (weatherCode: number) => {
  if (weatherCode === 5) {
   setBgImage(defaultBg);
  }
 };

 return { bgImage, handleBgChange };
};
