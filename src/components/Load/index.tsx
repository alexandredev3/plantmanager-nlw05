import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import loadAnimation from '../../assets/load.json';

import { styles } from './styles';

export function Load() {
  return (
    <View style={styles.container}>
      <LottieView 
        style={styles.animation}
        source={loadAnimation}
        autoPlay
        loop
      />
    </View>
  );
}