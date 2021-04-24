import { Plant } from '../../libs/storage';

export type SavePlants = (plant: Plant) => Promise<void>;
export type GetPlants = () => Promise<Plant[]>;
export type RemovePlant = (id: number) => Promise<void>;