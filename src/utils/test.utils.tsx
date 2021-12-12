/* eslint-disable indent */
/* eslint-disable react/display-name */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { RenderOptions, render } from '@testing-library/react-native';
import { ReactElement, ElementType } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../store/reducers';

const store = createStore(rootReducer);

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

export * from '@testing-library/react-native';
export { customRender as render };
