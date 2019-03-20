import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Mutation } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
};

export default function TodoCard({ todo }) {
  const { title, complete } = todo;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            style={styles.icon}
            name="md-checkmark"
            size={50}
            color={theme.colors.mainDk}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            style={styles.icon}
            name="md-more"
            size={50}
            color={theme.colors.mainDk}
          />
        </TouchableOpacity>
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
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
});
