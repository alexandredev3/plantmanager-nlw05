import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import { formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Header } from '../../components/Header';

import waterdropImg from '../../assets/waterdrop.png';

import { styles } from './styles';
import { usePlants, Plant } from '../../hooks/usePlant';
import { PlantCardSecondary } from '../../components/PlantCardSecondary';

export function MyPlants() {
  const { getPlants } = usePlants();
  
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState('');

  useEffect(() => {
    (async function() {
      const plants = await getPlants();
      const recentPlant = plants[0];

      // pegando a primeira posição porque a lista esta ordernada pelo horario mais proximo.
      // formatDistance vai calcular a distancia de uma hora para outra.
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
      setLoading(false);
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotligth}>
        <Image 
          style={styles.spotlightImage}
          source={waterdropImg} 
        />
        <Text style={styles.spotlightText}>
          { nextWaterd }
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <PlantCardSecondary data={{
                name: item.name,
                photo: item.photo,
                hour: item.hour,
              }} />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}