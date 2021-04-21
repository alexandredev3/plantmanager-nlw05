import { StyleSheet } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shape,
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  text: {
    fontFamily: fonts.text,
    color: colors.heading
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});