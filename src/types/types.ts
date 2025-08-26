import type { Dispatch, SetStateAction } from 'react';

export interface Place {
 name: string;
 latitude: number;
 longitude: number;
 country: string;
}

export interface PlaceDetail {
 id: number;
 name: string;
 latitude: number;
 longitude: number;
 elevation: number;
 feature_code: string;
 country_code: string;
 admin1_id: number;
 admin2_id: number;
 admin3_id: number;
 admin4_id: number;
 timezone: string;
 population: number;
 postcodes: string[];
 country_id: number;
 country: string;
 admin1: string;
 admin2: string;
 admin3: string;
 admin4: string;
}

export interface ApiResult<T> {
 state: 'success' | 'error' | '';
 data: T | null;
 message: string;
}

// export type SearchBoxProps = {
//  setWeatherInfo: Dispatch<SetStateAction<WeatherResponse | {}>>;
// };
export type SearchBoxProps = {
 setWeatherInfo: Dispatch<SetStateAction<WeatherResponse | null>>;
 setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export interface WeatherUnits {
 time: string;
 interval?: string;
 temperature_2m: string;
 weather_code: string;
}

export interface CurrentWeather {
 time: string; // ISO string
 interval: number;
 temperature_2m: number;
 weather_code: number;
}

export interface HourlyWeather {
 time: string[];
 temperature_2m: number[];
 weather_code: number[];
}

export interface WeatherResponse {
 latitude: number;
 longitude: number;
 generationtime_ms: number;
 utc_offset_seconds: number;
 timezone: string;
 timezone_abbreviation: string;
 elevation: number;
 current_units: WeatherUnits;
 current: CurrentWeather;
 hourly_units: WeatherUnits;
 hourly: HourlyWeather;
}
