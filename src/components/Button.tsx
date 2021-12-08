import React from 'react';
import {
  ViewProps,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
} & ViewProps;

const Button = (props: Props) => {
  const { label, onPress, loading, style, ...others } = props;
  return (
    <TouchableOpacity testID="custom-button" onPress={onPress}>
      <LinearGradient
        {...others}
        colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]}
        style={[styles.container, style]}>
        {loading ? (
          <ActivityIndicator
            testID="button-loading"
            size={20}
            color={Colors.WHITE}
          />
        ) : (
          <Text testID="label" style={styles.label}>
            {label}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 19,
    color: Colors.WHITE,
  },
});
export default Button;
