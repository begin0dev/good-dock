import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InitNavigation } from "./InitNavigation";
import { AppNavigation } from "./AppNavigation";

export type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<AppNavigation>,
  NativeStackNavigationProp<InitNavigation>
>;
