import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigation from './AppNavigation';
import LoginPage from '../pages/LoginPage';

const Stack = createNativeStackNavigator();

function InitNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginScreen" component={LoginPage} />
      <Stack.Screen name="AppScreen" component={AppNavigation} />
    </Stack.Navigator>
  );
}

export default InitNavigation;
