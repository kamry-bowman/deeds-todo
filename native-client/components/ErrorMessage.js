import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function ErrorMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sorry! Something went wrong!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.mainLt,
    fontSize: 25,
    fontFamily: 'nunito600',
    textAlign: 'center',
  },
});
