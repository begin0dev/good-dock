import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import useMount from './src/hooks/useMount';
import InitNavigation from './src/navigations/InitNavigation';

const App = () => {
  useMount(() => {
    SplashScreen.hide();
  });

  return (
    <NavigationContainer>
      <StatusBar />
      <InitNavigation />
    </NavigationContainer>
  );
};

export default App;
