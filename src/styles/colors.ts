import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme() || "light";

export const colors = {
  dark: {
    PRIMARY: "#7E68F9",
    SECONDARY: "#A0A0A0",
    BACKGROUND: "#FFFFFF",
    SECONDARY_BACKGROUND: "#E5E5E5",
    TEXT_0: "#3F454D",
    TEXT_1: "#A0A0A0",
    TEXT_BTN: "#FFFFFF",
    TEXT_HEADER: "#000000",

    CALENDAR_SUNDAY: "#D5325D",
    CALENDAR_SATURDAY: "#2A8CE3",
    CALENDAR_WEEKDAY: "#3F454D",
  },
  light: {
    PRIMARY: "#7E68F9",
    SECONDARY: "#A0A0A0",
    BACKGROUND: "#FFFFFF",
    SECONDARY_BACKGROUND: "#E5E5E5",
    TEXT_0: "#3F454D",
    TEXT_1: "#A0A0A0",
    TEXT_BTN: "#FFFFFF",
    TEXT_HEADER: "#000000",

    CALENDAR_SUNDAY: "#D5325D",
    CALENDAR_SATURDAY: "#2A8CE3",
    CALENDAR_WEEKDAY: "#3F454D",
  },
} as const;

export const themeColors = colors[colorScheme];
