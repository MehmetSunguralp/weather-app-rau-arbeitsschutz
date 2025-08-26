import React, { useState, useEffect, useRef } from 'react';
import { getPlaceByKeyword, getWeatherByCoords } from '../api/apiCalls';
import type { PlaceDetail, SearchBoxProps } from '../types/types';
import { Box, TextField, List, ListItem, ListItemButton, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = ({ setWeatherInfo }: SearchBoxProps) => {
 const [query, setQuery] = useState<string>('');
 const [places, setPlaces] = useState<PlaceDetail[]>([]);
 const [currentPlace, setCurrentPlace] = useState<string>('');
 const containerRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const fetchPlaces = async () => {
   if (query.length >= 2) {
    const placesResponse = await getPlaceByKeyword(query);
    setPlaces(placesResponse.state === 'success' && placesResponse.data?.length ? placesResponse.data : []);
   } else {
    setPlaces([]);
   }
  };
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

 const handleSelectPlace = async (place: PlaceDetail) => {
  const weatherResponse = await getWeatherByCoords(place.latitude, place.longitude);
  if (weatherResponse.state === 'success' && weatherResponse.data) {
   setWeatherInfo(weatherResponse.data);
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
  <Box ref={containerRef} className="flex flex-col items-center relative w-full max-w-md">
   <TextField
    placeholder={currentPlace || 'Stadt suchen...'}
    value={query}
    onChange={handleInputChange}
    fullWidth
    className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
    sx={{
     borderRadius: '50px',
     outline: 'none',
     '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      '&.Mui-focused fieldset': {
       borderColor: 'transparent',
       boxShadow: 'none',
      },
     },
    }}
    InputProps={{
     endAdornment: (
      <InputAdornment position="start">
       <SearchIcon fontSize="large" />
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
