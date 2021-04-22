import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Header } from '../../components/Header';
import { EnvironmentButton } from '../../components/EnvironmentButton';
import { PlantCardPrimary } from '../../components/PlantCardPrimary';
import { Load } from '../../components/Load';

import { styles } from './styles';
import api from '../../services/api';
import colors from '../../styles/colors';
import { Plant } from '../../libs/storage';

interface PlantEnvironmentData {
  key: string;
  title: string;
}

export function PlantSelect() {
  const navigator = useNavigation();

  const [plantsEnvironments, setPlantsEnvironments] = useState<PlantEnvironmentData[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);
  const [plantEnvironmentSelected, setPlantEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);


  async function fetchPlants() {
    const [environmentsResponse, plantsResponse] = await Promise.all([
      api.get('plants_environments?_sort=title&_order=asc'),
      api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
    ])

    const plants = plantsResponse.data;
    const environments = environmentsResponse.data;

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...plants]);
      setFilteredPlants(oldValue => [...oldValue, ...plants]);
      setLoadingMore(false);
      return;
    }

    setPlantsEnvironments([
      {
        key: 'all',
        title: 'Todos'
      },
      ...environments
    ]);
    setPlants(plants);
    setFilteredPlants(plants);
    setLoading(false);
    setLoadingMore(false);
  }

  function handlePlantEnvironmentSelect(environment: string) {
    setPlantEnvironmentSelected(environment);

    if (environment === 'all') 
      return setFilteredPlants(plants);

    const filteredPlants = plants.filter(plant => 
      plant.environments.includes(environment)
    );

    setFilteredPlants(filteredPlants)
  }

  function handleFetchMore(distance: number) {
    // se a distance for menor que 1 quer dizer que o usuario esta rolando para o sentido oposto(para cima).
    if (distance < 1) return;

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }
  
  function handlePlantSelect(plant: Plant) {
    navigator.navigate('PlantSave', {
      plant
    });
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar a sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={plantsEnvironments}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => {
            const isActive = item.key === plantEnvironmentSelected;

            return (
              <EnvironmentButton
                key={item.key}
                title={item.title}
                active={isActive}
                onPress={() => handlePlantEnvironmentSelect(item.key)}
              />
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList 
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            return (
              <PlantCardPrimary
                key={item.id} 
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1} // quando o usuario chegar a 10% do final da tela.
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)} // o que eu quero fazer quando chegar no final da tela
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : null}
        />
      </View>
    </View>
  );
}