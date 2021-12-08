import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Button from '../Button';

describe('Button', () => {
  it('Should render correctly', () => {
    const { getByTestId } = render(<Button label="" onPress={jest.fn()} />);
    getByTestId('custom-button');
  });

  it('Should render label', () => {
    const { getByText } = render(
      <Button label="mock-label" onPress={jest.fn()} />,
    );
    getByText('mock-label');
  });

  it('Should render loader when loading', () => {
    const { getByTestId } = render(
      <Button label="" onPress={jest.fn()} loading />,
    );
    getByTestId('button-loading');
  });

  it('Should call given onPress when click', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<Button label="" onPress={mockOnPress} />);
    const button = getByTestId('custom-button');

    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('Should accept custom view props', () => {
    const { getByTestId } = render(
      <Button label="" onPress={jest.fn()} testID="mock-test-id" />,
    );
    getByTestId('mock-test-id');
  });
});
