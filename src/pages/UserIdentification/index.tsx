import React, { useState } from 'react';
import { 
  SafeAreaView,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/useAuth';

import colors from '../../styles/colors';
import { styles } from './styles';

export function UserIdentification() {
  const { handleAuth } = useAuth();
  const navigator = useNavigation();

  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name)
      return Alert.alert("Me diz ai como se chama!");

    try {
      navigator.navigate('Confirmation', {
        title: 'Prontinho',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
      });
    } catch(error) {
      Alert.alert('Não foi possível salvar o seu nome!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback 
          disabled={!isFocused} 
          onPress={Keyboard.dismiss}
        >
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isFilled ? "😄" : "😀"}
                </Text>
                <Text style={styles.title}>
                  Como podemos {"\n"} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: 
                      isFocused || isFilled ? 
                      colors.green : 
                      colors.gray
                  }
                ]}
                placeholder="Digite um nome" 
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={(value) => handleInputChange(value)}
              />

              <View style={styles.footer}>
                <Button
                  disabled={!name}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>
                    Confirmar
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}