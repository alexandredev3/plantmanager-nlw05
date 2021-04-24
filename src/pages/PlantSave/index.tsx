import React, { useState } from 'react';
import {
  Alert,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore, format } from 'date-fns';

import { Button } from '../../components/Button';

import waterdropImg from '../../assets/waterdrop.png';

import { styles } from './styles';
import { usePlant } from '../../hooks/usePlant';
import { Plant } from '../../libs/storage';

interface PlantParam {
  plant: Plant;
}

export function PlantSave() {
  const route = useRoute();
  const navigator = useNavigation();
  const { savePlant } = usePlant();

  const { plant } = route.params as PlantParam;

  const currentDate = new Date();
  const isAndroidPlatform = Platform.OS === 'android';
  const isIOSPlatform = Platform.OS === 'ios';

  const [selectedDateTime, setSelectedDateTime] = useState(currentDate);
  const [showDatePicker, setShowDatePicker] = useState(isIOSPlatform);

  function handleChangeTime(_: Event, dateTime: Date | undefined) {
    const currentDate = new Date();
    const isBeforeCurrentDate = dateTime && isBefore(dateTime, currentDate);

    if (isAndroidPlatform) {
      setShowDatePicker(oldValue => !oldValue);
    }

    if (isBeforeCurrentDate) {
      setSelectedDateTime(currentDate);
      return Alert.alert('Escolha uma hora no futuro!');
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handeleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldValue => !oldValue);
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigator.navigate('Confirmation', {
        title: 'Tudo certo',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
      })
    } catch(error) {
      Alert.alert('Não foi possível salvar sua planta!');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.wrapper}>
        <View style={styles.plantInfo}>
          <SvgFromUri 
            uri={plant.photo}
            width={150}
            height={150}
          />

          <Text style={styles.plantName}>
            { plant.name }
          </Text>
          <Text style={styles.plantAbout}>
            { plant.about }
          </Text>
        </View>

        <View style={styles.controllers}>
          <View style={styles.tipContainer}>
            <Image 
              style={styles.tipImage}
              source={waterdropImg}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {
            showDatePicker && (
              <DateTimePicker 
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            )
          }

          {
            isAndroidPlatform && (
              <TouchableOpacity
                style={styles.dateTimePickerButton}
                onPress={handeleOpenDateTimePickerForAndroid}
                activeOpacity={.7}
              >
                <Text style={styles.dateTimePickerText}>
                  {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                </Text>
              </TouchableOpacity>
            )
          }

          <Button onPress={handleSavePlant}>
            <Text style={styles.buttonText}>
              Cadastrar Planta
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}