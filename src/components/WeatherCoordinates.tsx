import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Colors } from '../constants';
import { AppStackProp, FormValues } from '../types';
import Button from './Button';

const defaultValues: FormValues = {
  latitude: 0,
  longitude: 0,
};

const validationSchema = yup.object().shape({
  latitude: yup.number().required().min(-90).max(90),
  longitude: yup.number().required().min(-180).max(180),
});

const WeatherCoordinates = () => {
  const navigation = useNavigation<AppStackProp>();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(values => {
    navigation.navigate('Weather', values);
  });

  return (
    <View testID="weather-coordinates">
      <View style={styles.container}>
        <Controller
          control={form.control}
          render={({ field: { onChange } }) => (
            <TextInput
              testID="weather-coordinate-latitude"
              onChangeText={onChange}
              placeholder="latitude"
              placeholderTextColor={Colors.GRAY}
              style={styles.input}
            />
          )}
          name="latitude"
        />
        {form.formState.errors.latitude && (
          <Text style={styles.textError}>Latitude must be a valid number</Text>
        )}

        <Controller
          control={form.control}
          render={({ field: { onChange } }) => (
            <TextInput
              testID="weather-coordinate-longitude"
              onChangeText={onChange}
              placeholder="longitude"
              placeholderTextColor={Colors.GRAY}
              style={styles.input}
            />
          )}
          name="longitude"
        />
        {form.formState.errors.longitude && (
          <Text style={styles.textError}>Longitude must be a valid number</Text>
        )}
      </View>
      <Button testID="button" label="find" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  input: {
    marginTop: 5,
    backgroundColor: Colors.TRANSPARENT,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  textError: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

export default WeatherCoordinates;
