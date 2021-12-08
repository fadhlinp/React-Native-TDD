import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';
import App from '../App';
import HomeScreen from '../screens/HomeScreen';
import WeatherScreen from '../screens/WeatherScreen';
import { useNavigation } from '@react-navigation/core';

import { AppStackProp } from '../types';

jest.mock('../screens/HomeScreen.tsx', () => jest.fn());
jest.mock('../screens/WeatherScreen.tsx', () => jest.fn());

describe('AppNavigator', () => {
  it('Should render HomeScreen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );
    const { getByTestId } = render(<App />);
    await waitFor(() => getByTestId('mock-home-screen'));
  });

  it('Should render WeatherScreen on "Weather" route', async () => {
    (HomeScreen as jest.Mock).mockImplementationOnce(() => {
      const navigation = useNavigation<AppStackProp>();

      useEffect(() => {
        navigation.navigate('Weather', { latitude: 0, longitude: 0 });
      }, [navigation]);

      return null;
    });

    (WeatherScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );
    const { getByTestId } = render(<App />);
    await waitFor(() => {
      getByTestId('mock-weather-screen');
    });
  });
});
