import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoragePlantData } from './types';

import { GetPlantsStorage, SavePlantsStorage } from './types';

const getPlantsStorage: GetPlantsStorage = async () => {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  
  if (!data) {
    return {};
  }

  const plants = JSON.parse(data) as StoragePlantData;

  return plants;
}

const savePlantsStorage: SavePlantsStorage = async (plants: object) => {
  await AsyncStorage.setItem(
    '@plantmanager:plants', 
    JSON.stringify({
      ...plants
    })
  );
}

export {
  getPlantsStorage,
  savePlantsStorage,
}