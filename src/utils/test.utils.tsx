/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable indent */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { RenderOptions, render } from '@testing-library/react-native';
import { ReactElement, ElementType } from 'react';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { StateType } from '../store/reducers';
import { runSaga } from '@redux-saga/core';

const store = createStore(rootReducer);

type Action = {
  type?: any;
  payload?: any;
};

type CustomRenderOptions = {
  store?: typeof store;
};

const AllTheProviders =
  (options: CustomRenderOptions) =>
  ({ children }: { children: ElementType }) => {
    return <Provider store={options.store || store}>{children}</Provider>;
  };

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions & Omit<RenderOptions, 'queries'> = {},
) => {
  const { store, ...others } = options;

  return render(ui, {
    wrapper: AllTheProviders({ store }) as React.ComponentType,
    ...others,
  });
};

export async function recordSaga(worker: any, initialAction: Action) {
  const dispatched: Array<Function> = [];

  await runSaga(
    {
      dispatch: (action: Function) => dispatched.push(action),
    },
    worker,
    initialAction,
  ).toPromise();

  return dispatched;
}

export function mockStore(interceptor?: jest.Mock) {
  const logger: Middleware<{}, StateType> = () => next => action => {
    interceptor?.(action);
    return next(action);
  };

  return createStore(rootReducer, undefined, applyMiddleware(logger));
}

export * from '@testing-library/react-native';
export { customRender as render };
