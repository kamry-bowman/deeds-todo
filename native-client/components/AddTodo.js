import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { Mutation } from 'react-apollo';
import { ADD_TODO, USER_TODOS, USERNAME, TODOS } from '../gql';

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
            <React.Fragment>
              <TextInput
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
              <Button title="Todo List" onPress={handleSubmit} />
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
