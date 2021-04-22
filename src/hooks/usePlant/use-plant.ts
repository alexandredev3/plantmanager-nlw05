import { savePlant, getPlants } from './plant-manager';

export function usePlants() {
  return { savePlant, getPlants };
}