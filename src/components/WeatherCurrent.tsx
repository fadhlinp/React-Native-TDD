/* eslint-disable no-empty */
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import LocationService from '../services/LocationService';
import { AppStackProp } from '../types';
import Button from './Button';
import { StyleSheet } from 'react-native';
import { Colors } from '../constants';

function WeatherCurrent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation<AppStackProp>();

  const handleFetchWeather = useCallback(async () => {
    setError(false);
    setLoading(true);
    try {
      const position = await LocationService.getCurrentPosition();
      navigation.navigate('Weather', position);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [navigation]);

  return (
    <Button
      testID="weather-current"
      label="Weather at my position"
      onPress={handleFetchWeather}
      loading={loading}
      style={error && styles.error}
    />
  );
}

const styles = StyleSheet.create({
  error: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.ERROR,
  },
});
export default WeatherCurrent;
