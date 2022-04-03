export const SIZE_MAPPER = {
  small: 34,
  medium: 40,
  large: 46,
} as const;

export type SizeType = keyof typeof SIZE_MAPPER;
