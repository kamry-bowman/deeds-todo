import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import { Mutation } from 'react-apollo';
import { Ionicons } from '@expo/vector-icons';
import { ADD_TODO, TODOS } from '../gql';
import theme from '../theme';

const initialState = {
  title: '',
  description: '',
};

export default class TodoList extends React.Component {
  state = { ...initialState };

  render() {
    return (
      <Mutation
        mutation={ADD_TODO}
        update={(cache, { data: { createTodo } }) => {
          const {
            user: { username },
            ...newTodo
          } = createTodo;
          const { todos } = cache.readQuery({
            query: TODOS,
            variables: {
              username,
            },
          });
          cache.writeQuery({
            query: TODOS,
            variables: {
              username,
            },
            data: { todos: todos.concat(newTodo) },
          });
        }}
      >
        {(createTodo, { data }) => {
          const handleSubmit = () => {
            createTodo({
              variables: {
                title: this.state.title,
                description: this.state.description,
              },
            })
              .then(result => {
                this.setState({ ...initialState });
              })
              .catch(err => console.log(err));
          };
          return (
            <View style={styles.container}>
              <TouchableHighlight onPress={handleSubmit}>
                <Ionicons
                  style={styles.addButton}
                  name="md-add-circle"
                  size={50}
                  color={theme.colors.mainDk}
                />
              </TouchableHighlight>
              <TextInput
                placeholder="Enter a todo..."
                placeholderTextColor={theme.colors.mainDkTrans}
                style={styles.input}
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: theme.padding.outer,
    marginRight: theme.padding.outer,
    paddingBottom: 0,
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.mainDkTrans,
  },
  addButton: {
    width: 60,
    height: 50,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    color: theme.colors.mainDkOpaque,
    fontFamily: 'nunito700',
    fontSize: 25,
    textAlign: 'center',
  },
});
