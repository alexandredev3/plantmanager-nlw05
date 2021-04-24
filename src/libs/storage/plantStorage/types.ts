export interface Plant {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[];
  frequency: {
    times: number;
    repeat_every: string;
  },
  dateTimeNotification: Date;
  hour: string;
}

export interface StoragePlantData{
  [id: string]: {
    data: Plant;
    notificationId: string;
  };
}

export type GetPlantsStorage = () => Promise<StoragePlantData>;
export type SavePlantsStorage = (plants: object) => Promise<void>;