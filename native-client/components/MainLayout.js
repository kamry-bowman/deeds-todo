import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import theme from '../theme';

export default function MainLayout({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    ...theme.debug,
  },
});
