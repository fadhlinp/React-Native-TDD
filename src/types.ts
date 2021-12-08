import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Weather: { latitude: number; longitude: number };
};

export type AppStackProp = StackNavigationProp<RootStackParamList>;
