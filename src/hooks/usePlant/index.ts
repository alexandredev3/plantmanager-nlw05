import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';

import {
  savePlantsStorage,
  getPlantsStorage,
  Plant
} from '../../libs/storage';
import { SavePlants, GetPlants, RemovePlant } from './types'

export const savePlant: SavePlants = async (plant: Plant) => {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const currentDate = new Date();

    const { times, repeat_every } = plant.frequency;

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times); // quando vezes tem que regar na semana.
      nextTime.setDate(currentDate.getDate() + interval); // proxima vez que tem que regar.
    } /* else {
      nextTime.setDate(nextTime.getDate() + 1) // lembrar no dia seguinte.
    } */

    console.log({
      nextTime,
      currentDate
    })

    const seconds = Math.abs(
      Math.ceil(currentDate.getTime() - nextTime.getTime()) / 1000); // Math.abs não ter a possibilidade de numeros negativos, numero absoluto

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds, // tem que ser pelo menos 60 seguntos.
        repeats: true,
      }
    });

    const plants = await getPlantsStorage();

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    }

    await savePlantsStorage({
      ...plants,
      ...newPlant
    });
  } catch(error) {
    throw new Error(error);
  }
}

export const getPlants: GetPlants = async () => {
  try {
    const plants = await getPlantsStorage();

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

export const removePlant: RemovePlant = async (id: number) => {
  try {
    const plants = await getPlantsStorage();

    console.log(plants[id].notificationId)

    delete plants[id];

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

    await savePlantsStorage({
      ...plants,
    });
  } catch(error) {
    throw new Error(error);
  }
}

export const usePlant = () => {
  return {
    savePlant,
    getPlants,
    removePlant
  }
}