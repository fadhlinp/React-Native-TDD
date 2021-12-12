import WeatherService from '../../../services/WeatherService';
import { recordSaga } from '../../../utils/test.utils';
import {
  fetchWeather,
  fetchWeatherFailure,
  fetchWeatherSuccess,
} from '../actions';
import { nullWeather } from '../reducer';
import { weatherStartWorker } from '../sagas';

describe('store/weather', () => {
  describe('saga', () => {
    describe('onStart', () => {
      test('Should call fetchWeather API and dispatch success action when successful', async () => {
        jest
          .spyOn(WeatherService, 'fetchCurrentWeather')
          .mockResolvedValueOnce(nullWeather);

        const dispatched = await recordSaga(
          weatherStartWorker,
          fetchWeather(0, 0),
        );
        expect(dispatched).toStrictEqual([fetchWeatherSuccess(nullWeather)]);
      });

      test('Should call fetchWeather API and dispatch failure action when unsuccessful', async () => {
        jest
          .spyOn(WeatherService, 'fetchCurrentWeather')
          .mockRejectedValueOnce(new Error('mock-error'));

        const dispatched = await recordSaga(
          weatherStartWorker,
          fetchWeather(0, 0),
        );
        expect(dispatched).toStrictEqual([fetchWeatherFailure('mock-error')]);
      });
    });
  });
});