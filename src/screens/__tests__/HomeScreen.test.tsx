import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import WeatherCurrent from '../../components/WeatherCurrent';
import WeatherCoordinates from '../../components/WeatherCoordinates';

jest.mock('../../components/WeatherCurrent.tsx', () =>
  jest.fn().mockReturnValue(null),
);
jest.mock('../../components/WeatherCoordinates.tsx', () =>
  jest.fn().mockReturnValue(null),
);

describe('HomeScreen', () => {
  it('Should render correctly', () => {
    const wrapper = render(<HomeScreen />);
    wrapper.getByTestId('home-screen');
  });

  describe('title section', () => {
    beforeEach(() => {
      jest.useFakeTimers('modern'); //Tue Dec 07 2021 09:55:43 GMT+0700 (Western Indonesia Time)
      jest.setSystemTime(1638845720665); //
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('Should contain current date', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Dec 07, 2021');
    });

    it('Should contain current day', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByText('Tuesday');
    });

    it('Should contain a section to get current weather', () => {
      (WeatherCurrent as jest.Mock).mockReturnValue(
        <View testID="mock-weather-current" />,
      );

      const wrapper = render(<HomeScreen />);
      wrapper.getByTestId('mock-weather-current');
    });

    it('Should contain a divider text', () => {
      const wrapper = render(<HomeScreen />);
      wrapper.getByTestId('divider-text');
    });

    it('Should contain a section to get weather at given coordinates', () => {
      (WeatherCoordinates as jest.Mock).mockReturnValue(
        <View testID="mock-weather-coordinates" />,
      );

      const wrapper = render(<HomeScreen />);
      wrapper.getByTestId('mock-weather-coordinates');
    });
  });
});
