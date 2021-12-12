import { Status, WeatherType } from '../../../types';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherReset,
  fetchWeatherSuccess,
} from '../actions';
import reducer, { initialState, nullWeather } from '../reducer';

describe('Store/weather', () => {
  describe('reducer', () => {
    const mockWeather: WeatherType = {
      city: 'mock-city',
      description: 'mock-description',
      humidity: 100,
      icon: 'mock-icon',
      pressure: 1000,
      temperature: 10,
      windSpeed: 10,
    };

    test('Should return initialState', () => {
      const state = reducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });

    test('Should handle fetchWeather action', () => {
      const state = reducer(undefined, fetchWeather(0, 0));
      expect(state).toEqual({
        status: Status.LOADING,
        error: '',
        weather: nullWeather,
      });
    });

    test('Should handle fetchWeatherSuccess action', () => {
      const state = reducer(undefined, fetchWeatherSuccess(mockWeather));
      expect(state).toEqual({
        status: Status.SUCCESS,
        error: '',
        weather: mockWeather,
      });
    });

    test('Should handle fetchWeatherFailure action', () => {
      const state = reducer(undefined, fetchWeatherFailure('mock-error'));
      expect(state).toEqual({
        status: Status.FAILURE,
        error: 'mock-error',
        weather: nullWeather,
      });
    });

    test('Should handle fetchWeatherReset action', () => {
      const success = reducer(undefined, fetchWeatherSuccess(mockWeather));
      const state = reducer(success, fetchWeatherReset());
      expect(state).toEqual(initialState);
    });
  });
});
