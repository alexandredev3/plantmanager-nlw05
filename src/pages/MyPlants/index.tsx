import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Alert
} from 'react-native';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { PlantCardSecondary } from '../../components/PlantCardSecondary';

import waterdropImg from '../../assets/waterdrop.png';

import { styles } from './styles';
import { usePlant } from '../../hooks/usePlant';
import { Plant } from '../../libs/storage';

export function MyPlants() {
  const { getPlants, removePlant } = usePlant();
  
  const [myPlants, setMyPlants] = useState<Plant[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState('');

  function handleRemove(plant: Plant) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants(oldPlants => {
              const plantsFiltered = oldPlants?.filter(oldPlant => oldPlant.id !== plant.id);
              return plantsFiltered;
            });
          } catch (error) {
            console.log(error)

            Alert.alert("Não foi possível remover a planta!");
          }
        }
      }
    ])
  }

  useEffect(() => {
    (async function() {
      const plants = await getPlants();
      const recentPlant = plants[0];

      // pegando a primeira posição porque a lista esta ordernada pelo horario mais proximo.
      // formatDistance vai calcular a distancia de uma hora para outra.

      if (recentPlant) {
        const nextTime = formatDistance(
          new Date(recentPlant.dateTimeNotification).getTime(),
          new Date().getTime(),
          {
            locale: ptBR,
          }
        )
  
        setNextWaterd(
          `Não se esqueça de regar a ${recentPlant.name} á ${nextTime}.`
        );
        setMyPlants(plants);
      }
      setIsLoading(false);
    })()
  }, [])

  if (isLoading) {
    return <Load />
  }

  console.log(myPlants)

  return (
    <View style={styles.container}>
      <Header />

      {myPlants && (
        <View style={styles.spotligth}>
          <Image 
            style={styles.spotlightImage}
            source={waterdropImg} 
          />
          <Text style={styles.spotlightText}>
            { nextWaterd }
          </Text>
        </View>
      )}

      <View style={styles.plants}>
        <Text style={styles.plantTitle}>
          Próximas regadas
        </Text>

        {myPlants && (
          <FlatList 
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => {
              return (
                <PlantCardSecondary 
                  data={{
                    name: item.name,
                    photo: item.photo,
                    hour: item.hour,
                  }} 
                  handleRemove={() => handleRemove(item)}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}