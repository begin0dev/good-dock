import { StyleProp } from "react-native";

export const SIZE_MAPPER = {
  small: 34,
  medium: 40,
  large: 46,
} as const;

export type SizeType = keyof typeof SIZE_MAPPER;

export const sx = (...args: Array<StyleProp<any> | [StyleProp<any>, boolean]>): StyleProp<any> =>
  args.reduce<StyleProp<any>>((acc, cur) => {
    if (Array.isArray(cur)) {
      if (cur[1]) return { ...acc, ...cur[0] };
      return acc;
    }
    return { ...acc, ...(cur as StyleProp<any>) };
  }, {});
