import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme() || "light";

export const colors = {
  dark: {
    PRIMARY: "#7E68F9",
    SECONDARY: "#A0A0A0",
    BACKGROUND: "#E5E5E5",
    SECONDARY_BACKGROUND: "#FFFFFF",
    TEXT_0: "#3F454D",
    TEXT_1: "#A0A0A0",
    TEXT_BTN: "#FFFFFF",
  },
  light: {
    PRIMARY: "#7E68F9",
    SECONDARY: "#A0A0A0",
    BACKGROUND: "#E5E5E5",
    SECONDARY_BACKGROUND: "#FFFFFF",
    TEXT_0: "#3F454D",
    TEXT_1: "#A0A0A0",
    TEXT_BTN: "#FFFFFF",
  },
} as const;

export const themeColors = colors[colorScheme];
