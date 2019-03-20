import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Mutation } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
};

export default function TodoCard({ todo }) {
  const { title, description } = todo;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableHighlight onPress={() => {}}>
          <Ionicons
            style={styles.icon}
            name="md-add-circle"
            size={50}
            color={theme.colors.mainDk}
          />
        </TouchableHighlight>
        <Text style={styles.text}>{title}</Text>
        <TouchableHighlight onPress={() => {}}>
          <Ionicons
            style={styles.icon}
            name="md-add-circle"
            size={50}
            color={theme.colors.mainDk}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: theme.colors.mainDk,
    borderRadius: theme.border.radius,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: theme.colors.mainLt,
  },
  text: {
    color: theme.colors.mainLt,
    fontSize: 25,
    fontFamily: 'nunito600',
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    ...theme.debug,
  },
});
