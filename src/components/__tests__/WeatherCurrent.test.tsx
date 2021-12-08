import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import WeatherCurrent from '../WeatherCurrent';
import LocationService from '../../services/LocationService';
import { Colors } from '../../constants';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual<object>('@react-navigation/native'),
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() }),
  };
});

describe('WeatherCurrent', () => {
  it('Should render correctly', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByTestId('weather-current');
  });

  it('Should render label "Weather at my position"', () => {
    const wrapper = render(<WeatherCurrent />);
    wrapper.getByText('Weather at my position');
  });

  it('Should navigate to weather screen with location', async () => {
    const mockNavigate = jest.fn();
    (useNavigation as jest.Mock).mockReturnValueOnce({
      navigate: mockNavigate,
    });

    const wrapper = render(<WeatherCurrent />);
    const button = wrapper.getByTestId('weather-current');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Weather', {
        latitude: 0,
        longitude: 0,
      });
    });
  });

  describe('Loader', () => {
    it('Should render when position is being fetched', async () => {
      let mockResolve!: (position: {
        latitude: number;
        longitude: number;
      }) => void;

      const mockService = jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockImplementationOnce(
          () =>
            new Promise(resolve => {
              mockResolve = resolve;
            }),
        );

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await expect(
        wrapper.findByTestId('button-loading'),
      ).resolves.toBeDefined();
      await act(async () => {
        await mockResolve({ latitude: 0, longitude: 0 });
      });

      mockService.mockRestore();
    });

    it('Should not be rendered when position has been fetched', async () => {
      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');

      fireEvent.press(button);

      return expect(wrapper.findByTestId('label')).resolves.toBeDefined();
    });

    it('Should not be rendered when fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');

      fireEvent.press(button);

      return expect(wrapper.findByTestId('label')).resolves.toBeDefined();
    });
  });

  describe('Error', () => {
    it('Should displayed when fetching position has failed', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        expect(button).toHaveStyle({ borderColor: Colors.ERROR });
      });
    });

    it('Should be reset after fetching position again', async () => {
      jest
        .spyOn(LocationService, 'getCurrentPosition')
        .mockRejectedValueOnce(new Error(''));

      const wrapper = render(<WeatherCurrent />);
      const button = wrapper.getByTestId('weather-current');
      fireEvent.press(button);

      await waitFor(() => {
        fireEvent.press(button);
        expect(button).not.toHaveStyle({ borderColor: Colors.ERROR });
      });
    });
  });
});
