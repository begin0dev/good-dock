import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigation from './src/navigations/AppNavigation';
import useMount from './src/hooks/useMount';

const App = () => {
  useMount(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <StatusBar />
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
