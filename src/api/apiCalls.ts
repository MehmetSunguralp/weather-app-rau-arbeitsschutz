// src/api/apiCalls.ts
import axios from 'axios';
import type { ApiResult, WeatherResponse, PlaceDetail } from '../types/types';

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const getPlaceByKeyword = async (keyword: string): Promise<ApiResult<PlaceDetail[]>> => {
 const resultData: ApiResult<PlaceDetail[]> = {
  state: '',
  data: [],
  message: '',
 };

 try {
  const res = await axios.get(GEO_API, {
   params: {
    name: keyword,
    count: 10,
    language: 'de',
    country: 'DE',
    format: 'json',
   },
  });

  const placesInGermany: [] = res.data.results.filter((place: PlaceDetail) => {
   return place.country_code == 'DE';
  });
  if (placesInGermany.length == 0) {
   resultData.state = 'error';
   resultData.message = "Couldn't find such place in Germany";
   return resultData;
  }
  resultData.state = 'success';
  resultData.data = placesInGermany;
 } catch (err: any) {
  resultData.state = 'error';
  resultData.message = err.message;
 }

 return resultData;
};

export const getWeatherByCoords = async (lat: number, lon: number): Promise<ApiResult<WeatherResponse>> => {
 const resultData: ApiResult<WeatherResponse> = {
  state: '',
  data: null,
  message: '',
 };

 try {
  const res = await axios.get(WEATHER_API, {
   params: {
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,weather_code,is_day,wind_speed_10m,relative_humidity_2m',
    hourly: 'temperature_2m,weather_code,precipitation',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
   },
  });

  resultData.state = 'success';
  resultData.data = res.data;
 } catch (err: any) {
  resultData.state = 'error';
  resultData.message = err.message;
 }

 return resultData;
};
