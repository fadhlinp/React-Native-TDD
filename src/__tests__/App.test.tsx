import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View } from 'react-native';
import App from '../App';
import { Provider } from 'react-redux';
import AppNavigation from '../navigation/AppNavigation';
import store from '../store';

jest.mock('../navigation/AppNavigation.tsx', () => jest.fn());
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual<object>('react-redux'),
    Provider: jest.fn(),
  };
});

describe('AppNavigator', () => {
  it('Should render routes', async () => {
    (Provider as jest.Mock).mockImplementationOnce(({ children }) => children);

    (AppNavigation as jest.Mock).mockReturnValueOnce(
      <View testID="mock-routes" />,
    );
    const { getByTestId } = render(<App />);
    await waitFor(() => getByTestId('mock-routes'));
  });

  it('Should render Provider', () => {
    let providerStore!: typeof store;
    (Provider as jest.Mock).mockImplementation(({ store }) => {
      providerStore = store;
      return <View testID="mock-provider" />;
    });

    const wrapper = render(<App />);
    wrapper.getByTestId('mock-provider');
    expect(providerStore).toBe(store);
  });
});
