/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from '@redux-saga/core/effects';
import WeatherService from '../../services/WeatherService';
import {
  Actions,
  fetchWeatherFailure,
  fetchWeatherSuccess,
  WEATHER_START_TYPE,
} from './actions';

export default function* saga() {
  yield takeLatest(Actions.START, weatherStartWorker);
}

export function* weatherStartWorker(action: WEATHER_START_TYPE): any {
  try {
    const weather = yield call(
      WeatherService.fetchCurrentWeather,
      action.payload.latitude,
      action.payload.longitude,
    );
    yield put(fetchWeatherSuccess(weather));
  } catch (e: any) {
    yield put(fetchWeatherFailure(e.message));
  }
}
