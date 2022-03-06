import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ValueOf } from '../types/utils';
import useColor from '../hooks/useColor';
import { IcCalendar, IcHome, IcMenu } from '../assets/svgs';
import HomePage from '../pages/HomePage';
import CalendarPage from '../pages/CalendarPage';
import MenuPage from '../pages/MenuPage';

const AppNavigations = {
  HOME: 'Home',
  CALENDAR: 'Calendar',
  MENU: 'Menu',
} as const;

export type AppNavigationNames = ValueOf<typeof AppNavigations>;
export type AppNavigation = Record<AppNavigationNames, undefined>;

const Tab = createBottomTabNavigator<AppNavigation>();

function AppNavigation() {
  const colors = useColor();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: colors.SECONDARY,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarItemStyle: {
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ tabBarIcon: ({ color }) => <IcHome color={color} /> }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarPage}
        options={{ tabBarIcon: ({ color }) => <IcCalendar color={color} /> }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuPage}
        options={{ tabBarIcon: ({ color }) => <IcMenu color={color} /> }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;
