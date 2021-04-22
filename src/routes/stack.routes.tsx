import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthRoutes } from './tabs.routes';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';

import colors from '../styles/colors';

const StackRoutes = createStackNavigator();

export const AppRoutes = () => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <StackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />
    <StackRoutes.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />
    <StackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />
    <StackRoutes.Screen 
      name="PlantSelect"
      component={AuthRoutes}
    />
    <StackRoutes.Screen 
      name="PlantSave"
      component={PlantSave}
    />
    <StackRoutes.Screen 
      name="MyPlants"
      component={AuthRoutes}
    />
  </StackRoutes.Navigator>
)