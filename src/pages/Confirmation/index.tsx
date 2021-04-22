import React from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../../components/Button';

import { styles } from './styles';

interface RouteParams {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen: string;
}

const emojis = {
  smile: '😄',
  hug: '🤗',
}

export function Confirmation() {
  const navigator = useNavigation();
  const route = useRoute();

  const {
    title,
    buttonTitle,
    icon,
    nextScreen,
    subtitle
  } = route.params as RouteParams;

  function handleMoveOn() {
    navigator.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          {emojis[icon]}
        </Text>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>

        <View style={styles.footer}>
          <Button onPress={handleMoveOn}>
            <Text style={styles.buttonText}>
              {buttonTitle}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}