import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

export default function TodoCard({ todo, editTodo, ...rest }) {
  const { title, completed } = todo;
  if (!completed) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => {
              editTodo({
                variables: {
                  id: todo.id,
                  completed: !completed,
                },
              });
            }}
          >
            <Ionicons
              style={styles.icon}
              name="md-checkmark"
              size={50}
              color={theme.colors.mainDk}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
          <TouchableOpacity
            onPress={() =>
              rest.navigation.navigate('SingleTodo', { id: todo.id })
            }
          >
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
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.cardComplete}>
          <TouchableOpacity
            style={styles.center}
            onPress={() => {
              editTodo({
                variables: {
                  id: todo.id,
                  completed: !completed,
                },
              });
            }}
          >
            <Text style={styles.textComplete}>{`     ${title}     `}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
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
    justifyContent: 'center',
  },
  cardComplete: {
    borderRadius: theme.border.radius,
    borderColor: theme.colors.mainLt,
    borderWidth: 3,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: theme.colors.mainLt,
    width: 50,
    textAlign: 'center',
  },
  text: {
    color: theme.colors.mainLt,
    fontSize: 25,
    fontFamily: 'nunito600',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    maxHeight: 70,
    overflow: 'scroll',
  },
  textComplete: {
    color: theme.colors.mainLt,
    fontSize: 25,
    fontFamily: 'nunito600',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    textDecorationLine: 'line-through',
  },
});
