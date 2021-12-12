import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';

export type RootStackParamList = {
  Home: undefined;
  Weather: { latitude: number | string; longitude: number | string };
};

export type AppStackProp = StackNavigationProp<RootStackParamList>;

export type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

export type FormValues = {
  latitude: number | string;
  longitude: number | string;
};

export type WeatherType = {
  temperature: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  icon: string | null;
  description: string | null;
  city: string;
};

export enum Status {
  START = 'STATUS_START',
  FAILURE = 'STATUS_FAILURE',
  SUCCESS = 'STATUS_SUCCESS',
  LOADING = 'STATUS_LOADING',
}
