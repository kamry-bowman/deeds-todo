import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';

export default function Footer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: theme.padding.outer,
    paddingRight: theme.padding.outer,
    backgroundColor: theme.colors.mainDkSheer,
  },
});
