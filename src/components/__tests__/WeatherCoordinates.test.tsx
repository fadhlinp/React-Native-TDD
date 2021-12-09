import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import WeatherCoordinates from '../WeatherCoordinates';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn(),
  };
});

describe('WheaterCoordinates', () => {
  it('Should render correctly', () => {
    const wrapper = render(<WeatherCoordinates />);
    wrapper.getByTestId('weather-coordinates');
  });

  it('Should navigate to weather screen with latitude and longitude when form is valid', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    const wrapper = render(<WeatherCoordinates />);

    const fields = {
      latitude: wrapper.getByTestId('weather-coordinate-latitude'),
      longitude: wrapper.getByTestId('weather-coordinate-longitude'),
    };

    fireEvent.changeText(fields.latitude, '0');
    fireEvent.changeText(fields.longitude, '0');

    const button = wrapper.getByTestId('button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Longitude field', () => {
    it('Should not show error when value is the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const latitudeField = wrapper.getByTestId('weather-coordinate-latitude');

      fireEvent.changeText(latitudeField, '-90');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should not show error when value is the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const latitudeField = wrapper.getByTestId('weather-coordinate-latitude');

      fireEvent.changeText(latitudeField, '90');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should show error when value is lower than the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const latitudeField = wrapper.getByTestId('weather-coordinate-latitude');

      fireEvent.changeText(latitudeField, '-91');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).resolves.toBeDefined();
    });

    it('Should show error when value is higher than the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const latitudeField = wrapper.getByTestId('weather-coordinate-latitude');

      fireEvent.changeText(latitudeField, '91');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).resolves.toBeDefined();
    });

    it('Should show error when value is not a number', () => {
      const wrapper = render(<WeatherCoordinates />);
      const latitudeField = wrapper.getByTestId('weather-coordinate-latitude');

      fireEvent.changeText(latitudeField, 'a');

      return expect(
        wrapper.findByText('Latitude must be a valid number'),
      ).resolves.toBeDefined();
    });
  });

  describe('Longitude field', () => {
    it('Should not show error when value is the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const longitude = wrapper.getByTestId('weather-coordinate-longitude');

      fireEvent.changeText(longitude, '-180');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should not show error when value is the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const longitude = wrapper.getByTestId('weather-coordinate-longitude');

      fireEvent.changeText(longitude, '180');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).rejects.toThrow();
    });

    it('Should show error when value is lower than the lowest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const longitude = wrapper.getByTestId('weather-coordinate-longitude');

      fireEvent.changeText(longitude, '-181');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).resolves.toBeDefined();
    });

    it('Should show error when value is higher than the highest range value', () => {
      const wrapper = render(<WeatherCoordinates />);
      const longitude = wrapper.getByTestId('weather-coordinate-longitude');

      fireEvent.changeText(longitude, '181');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).resolves.toBeDefined();
    });

    it('Should show error when value is not a number', () => {
      const wrapper = render(<WeatherCoordinates />);
      const longitude = wrapper.getByTestId('weather-coordinate-longitude');

      fireEvent.changeText(longitude, 'a');

      return expect(
        wrapper.findByText('Longitude must be a valid number'),
      ).resolves.toBeDefined();
    });
  });
});
