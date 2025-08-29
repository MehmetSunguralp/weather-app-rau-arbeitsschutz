import React, { useState, useEffect, useRef } from 'react';
import { getPlaceByKeyword, getWeatherByCoords } from '../api/apiCalls';
import type { PlaceDetail, SearchBoxProps } from '../types/types';
import { Box, TextField, List, ListItem, ListItemButton, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = ({ setWeatherInfo, setIsLoading, setSelectedDayIndex, unit }: SearchBoxProps) => {
 const [query, setQuery] = useState<string>('');
 const [places, setPlaces] = useState<PlaceDetail[]>([]);
 const [currentPlace, setCurrentPlace] = useState<string>('');
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(async (position) => {
   const { latitude, longitude } = position.coords;
   if (latitude && longitude) {
    setIsLoading(true);
    const weatherResponse = await getWeatherByCoords(latitude, longitude, unit);
    if (weatherResponse.state == 'success') {
     setWeatherInfo(weatherResponse.data);
     setIsLoading(false);
    }
   } else {
    setIsLoading(false);
   }
  });
 }, []);

 useEffect(() => {
  const timeout = setTimeout(fetchPlaces, 300);
  return () => clearTimeout(timeout);
 }, [query]);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
    setPlaces([]);
   }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
 }, []);

 const fetchPlaces = async () => {
  if (query.length >= 2) {
   const placesResponse = await getPlaceByKeyword(query);
   setPlaces(placesResponse.state === 'success' && placesResponse.data?.length ? placesResponse.data : []);
   setIsLoading(false);
  } else {
   setPlaces([]);
  }
 };

 const handleSelectPlace = async (place: PlaceDetail) => {
  setIsLoading(true);
  const weatherResponse = await getWeatherByCoords(place.latitude, place.longitude, unit);
  if (weatherResponse.state === 'success' && weatherResponse.data) {
   const enrichedWeatherInfo = {
    ...weatherResponse.data,
    placeName: place.name,
   };
   setWeatherInfo(enrichedWeatherInfo);
   setIsLoading(false);
   setSelectedDayIndex(0);
  } else {
   setIsLoading(false);
  }
  setPlaces([]);
  setQuery('');
  setCurrentPlace(place.name);
 };

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const sanitized = e.target.value.replace(/[^a-zA-ZäöüÄÖÜß\s]/g, '');
  setQuery(sanitized);
 };

 return (
  <Box ref={containerRef} className="flex flex-col items-center relative w-full max-w-md z-10">
   <TextField
    placeholder={'Stadt suchen...'}
    value={query}
    onChange={handleInputChange}
    fullWidth
    autoComplete="off"
    className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
    sx={{
     borderRadius: '50px',
     backgroundColor: 'rgba(0, 0, 0, 0.4)',
     '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      color: 'rgba(255,255,255,0.9)',
      '& .MuiOutlinedInput-notchedOutline': {
       borderColor: 'transparent',
      },
      '&.Mui-focused': {
       '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
       },
      },
      '&.Mui-hovered': {
       '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
       },
      },
      '& input::placeholder': {
       color: 'rgba(255, 255, 255, 0.6)',
       opacity: 1,
      },
     },
    }}
    InputProps={{
     endAdornment: (
      <InputAdornment position="start">
       <SearchIcon fontSize="large" sx={{ color: 'rgba(255, 255, 255)' }} />
      </InputAdornment>
     ),
    }}
   />
   {places.length > 0 && (
    <Paper
     sx={{
      position: 'absolute',
      top: '100%',
      width: '100%',
      maxHeight: 240,
      overflowY: 'auto',
      zIndex: 10,
      borderRadius: '8px',
     }}
     elevation={4}
    >
     <List dense>
      {places.map((place) => (
       <ListItem key={place.id} disablePadding>
        <ListItemButton onClick={() => handleSelectPlace(place)}>
         {place.name}, {place.admin1}, {place.country}
        </ListItemButton>
       </ListItem>
      ))}
     </List>
    </Paper>
   )}
  </Box>
 );
};
