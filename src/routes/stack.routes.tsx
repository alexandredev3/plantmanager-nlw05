import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';

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
      component={PlantSelect}
    />
  </StackRoutes.Navigator>
)