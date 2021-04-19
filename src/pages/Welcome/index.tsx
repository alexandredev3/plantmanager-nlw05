import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';

import { styles } from './styles';

import { Button } from '../../components/Button';

import wateringImg from '../../assets/watering.png';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas {'\n'} de forma fácil
        </Text>
        <Image source={wateringImg} />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <Button>
          {">"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

// SafeAreaView: IOS Only.