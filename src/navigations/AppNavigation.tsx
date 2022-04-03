import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ValueOf } from "../types/utils";
import { IcCalendar, IcHome, IcMenu } from "../assets/svgs";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/CalendarPage";
import MenuPage from "../pages/MenuPage";
import { themeColors } from "../styles/colors";

const AppNavigations = {
  HOME: "Home",
  CALENDAR: "Calendar",
  MENU: "Menu",
} as const;

export type AppNavigationNames = ValueOf<typeof AppNavigations>;
export type AppNavigation = Record<AppNavigationNames, undefined>;

const Tab = createBottomTabNavigator<AppNavigation>();

function AppNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: themeColors.PRIMARY,
        tabBarInactiveTintColor: themeColors.SECONDARY,
        tabBarStyle: {
          minHeight: 54,
          backgroundColor: themeColors.SECONDARY_BACKGROUND,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}>
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
