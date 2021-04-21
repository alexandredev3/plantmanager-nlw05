import React from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.gretting}>Olá,</Text>
        <Text style={styles.userName}>Alexandre</Text>
      </View>

      <Image source={{ uri: 'https://github.com/alexandredev3.png' }} style={styles.avatar} />
    </View>
  );
}