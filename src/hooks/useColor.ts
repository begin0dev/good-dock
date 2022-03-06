import { useColorScheme } from 'react-native';

import { colors } from '../styles/colors';

function useColor() {
  const colorScheme = useColorScheme();

  return colors[colorScheme || 'light'];
}

export default useColor;
