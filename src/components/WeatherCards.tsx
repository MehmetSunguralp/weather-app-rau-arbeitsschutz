import { useWeatherIcon } from '../hooks/useWeatherIcon';
import { useWeatherCondition } from '../hooks/useWeatherCondition';
import type { WeatherResponse } from '../types/types';
import { formatDate } from '../utils/commonFunctions';
import { Box, Stack, Tooltip } from '@mui/material';
import type React from 'react';

interface WeatherCardsProps {
 weatherInfo: WeatherResponse;
 selectedDayIndex: number;
 setSelectedDayIndex: (idx: number) => void;
 setHoverDayIndex: (idx: number | null) => void;
 hoverDayIndex: number | null;
}

export const WeatherCards: React.FC<WeatherCardsProps> = ({
 weatherInfo,
 selectedDayIndex,
 setSelectedDayIndex,
 setHoverDayIndex,
 hoverDayIndex,
}) => {
 const { getWeatherIcon } = useWeatherIcon();
 const { getWeatherCondition } = useWeatherCondition();

 return (
  <Box
   className="mt-4 max-w-[1200px] w-full"
   sx={{
    display: 'grid',
    gridTemplateColumns: {
     xs: 'repeat(3, 1fr)',
     sm: 'repeat(3, 1fr)',
     md: 'repeat(6, 1fr)',
    },
    gap: { xs: 1, sm: 2, md: 2 },
    mb: 0,
    alignItems: 'stretch',
   }}
  >
   {weatherInfo.daily.time.slice(1).map((date, i) => {
    const icon = getWeatherIcon(weatherInfo.daily.weathercode[i]);
    const condition = getWeatherCondition(weatherInfo.daily.weathercode[i]);

    return (
     <Tooltip title="Regen" key={date} arrow>
      <Box
       className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
       sx={{
        borderRadius: 2,
        p: { xs: 1, sm: 2 },
        minWidth: 0,
        width: '100%',
        maxWidth: '100%',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor:
         i === selectedDayIndex
          ? 'rgba(11,174,255,0.2)'
          : hoverDayIndex === i
          ? 'rgba(11,174,255,0.1)'
          : 'rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.2s ease',
        mb: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: { md: '100%' },
       }}
       onMouseEnter={() => setHoverDayIndex(i)}
       onMouseLeave={() => setHoverDayIndex(null)}
       onClick={() => setSelectedDayIndex(i)}
      >
       <Box component={'span'} style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>
        {formatDate(date)}
       </Box>
       {icon && (
        <Box component="img" src={icon} alt={condition} sx={{ maxWidth: { lg: 120, sm: 96, xs: 48 }, mb: 0.5 }} />
       )}
       <Stack direction="row" spacing={1} alignItems="baseline">
        <Box component={'span'} style={{ fontWeight: 700, fontSize: '1rem' }}>
         {weatherInfo.daily.temperature_2m_max[i]}°
        </Box>
        <Box component={'span'} style={{ opacity: 0.7, fontSize: '0.9rem' }}>
         {weatherInfo.daily.temperature_2m_min[i]}°
        </Box>
       </Stack>
       <span style={{ opacity: 0.7, fontSize: '0.8rem', marginTop: 2 }}>{condition}</span>
      </Box>
     </Tooltip>
    );
   })}
  </Box>
 );
};
