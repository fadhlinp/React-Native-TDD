import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Weather: { latitude: number; longitude: number };
};

export type AppStackProp = StackNavigationProp<RootStackParamList>;
export type AppStackProp1 = StackNavigationProp<RootStackParamList>;

export type FormValues = {
  latitude: number;
  longitude: number;
};
