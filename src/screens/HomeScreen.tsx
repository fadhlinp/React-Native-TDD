import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Colors } from '../constants';
import WeatherCurrent from '../components/WeatherCurrent';
import WeatherCoordinates from '../components/WeatherCoordinates';

const HomeScreen = () => {
  const currendDate = moment(new Date());
  return (
    <LinearGradient
      testID="home-screen"
      colors={[Colors.LIGHT_GRAY, Colors.DANKER_GRAY]}
      style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.date}>{currendDate.format('MMM DD, YYYY')}</Text>
        <Text style={styles.day}>{currendDate.format('dddd')}</Text>
      </View>
      <WeatherCurrent />
      <Text testID="divider-text" style={styles.divider}>
        OR
      </Text>
      <WeatherCoordinates />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
  },
  title: {},
  date: {
    color: Colors.GRAY,
    fontSize: 13,
  },
  day: {
    color: Colors.WHITE,
    fontSize: 21,
  },
  divider: {
    textAlign: 'center',
    color: Colors.WHITE,
  },
});

export default HomeScreen;
