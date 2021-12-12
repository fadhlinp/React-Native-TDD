/* eslint-disable indent */
import { Status, WeatherType } from '../../types';
import { Actions, ActionTypes } from './actions';

export type State = {
  status: Status;
  error: string;
  weather: WeatherType;
};

export const nullWeather: WeatherType = {
  temperature: 0,
  windSpeed: 0,
  humidity: 0,
  pressure: 0,
  icon: null,
  description: null,
  city: '',
};

export const initialState: State = {
  status: Status.START,
  error: '',
  weather: nullWeather,
};

export default function (
  state = initialState,
  action: ActionTypes | { type: '@@INIT' },
): State {
  switch (action.type) {
    case Actions.START:
      return {
        ...state,
        status: Status.LOADING,
      };
    case Actions.SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        weather: action.payload.weather,
      };
    case Actions.FAILURE:
      return {
        ...state,
        status: Status.FAILURE,
        error: action.payload.error,
      };
    case Actions.RESET:
      return initialState;
    default:
      return state;
  }
}
