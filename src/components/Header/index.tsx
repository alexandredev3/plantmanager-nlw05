import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

export function Header() {
  const [user, setUser] = useState({
    name: ''
  });

  useEffect(() => {
  (async function() {
    const userName = await AsyncStorage.getItem('@plantmanager:user');

    if (userName) {
      setUser({
        name: userName
      });
    }
  })()
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.gretting}>Olá,</Text>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      <Image source={{ uri: 'https://github.com/alexandredev3.png' }} style={styles.avatar} />
    </View>
  );
}