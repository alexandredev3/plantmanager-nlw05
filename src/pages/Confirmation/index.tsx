import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../../components/Button';

import { styles } from './styles';

export function Confirmation() {
  const navigator = useNavigation();

  function handleMoveOn() {
    navigator.navigate('PlantSelect');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😀
        </Text>
        <Text style={styles.title}>
          Prontinho
        </Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button onPress={handleMoveOn}>
            <Text style={styles.buttonText}>
              Começar
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}