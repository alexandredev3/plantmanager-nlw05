import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import { Plant, StoragePlantData } from './plant.types';

export async function savePlant(plant: Plant): Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantData) : {};

    const newPlants = {
      [plant.id]: {
        data: plant
      }
    }

    await AsyncStorage.setItem(
      '@plantmanager:plants', 
      JSON.stringify({
        ...oldPlants, 
        ...newPlants
      })
    );
  } catch(error) {
    throw new Error(error);
  }
}

export async function getPlants(): Promise<Plant[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantData) : {};

    const plantsSorted = Object
      .keys(plants)
      .map(plant => {
        const time = format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')

        return {
          ...plants[plant].data,
          hour: time
        }
      })
      .sort((a, b) => 
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );
      // calculo para ordernar as plantas adicionadas primeiras.

    return plantsSorted;
  } catch(error) {
    throw new Error(error);
  }
}
