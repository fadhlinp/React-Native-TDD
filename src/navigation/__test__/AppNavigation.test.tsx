import { useNavigation } from '@react-navigation/core';
import { render, waitFor } from '@testing-library/react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import HomeScreen from '../../screens/HomeScreen';
import WeatherScreen from '../../screens/WeatherScreen';
import { AppStackProp } from '../../types';
import AppNavigation from '../AppNavigation';

jest.mock('../../screens/HomeScreen.tsx', () => jest.fn());
jest.mock('../../screens/WeatherScreen.tsx', () => jest.fn());

describe('AppNavigation', () => {
  it('Should render Home Screen by default', async () => {
    (HomeScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-home-screen" />,
    );

    const wrapper = render(<AppNavigation />);
    await waitFor(() => {
      wrapper.getByTestId('mock-home-screen');
    });
  });

  it('Should render WeatherScreen on "Weather" route', async () => {
    (HomeScreen as jest.Mock).mockImplementation(() => {
      const navigation = useNavigation<AppStackProp>();

      useEffect(() => {
        navigation.navigate('Weather', { latitude: 0, longitude: 0 });
      }, [navigation]);

      return null;
    });

    (WeatherScreen as jest.Mock).mockReturnValueOnce(
      <View testID="mock-weather-screen" />,
    );
    const wrapper = render(<AppNavigation />);

    await waitFor(() => {
      wrapper.getByTestId('mock-weather-screen');
    });
  });
});
