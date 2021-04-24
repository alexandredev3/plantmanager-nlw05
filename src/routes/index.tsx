import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Load } from '../components/Load';
import { Confirmation } from '../pages/Confirmation';
import { PublicRoutes } from './public.stack.routes';
import { PrivateRoutes } from './private.stack.routes';

import { useAuth } from '../hooks/useAuth';

const StackRoutes = createStackNavigator();

export const Routes = () => {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return <Load />
  }

  return (
    <NavigationContainer>
      {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  )
}