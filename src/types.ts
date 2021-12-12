import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Weather: { latitude: number | string; longitude: number | string };
};

export type AppStackProp = StackNavigationProp<RootStackParamList>;

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
