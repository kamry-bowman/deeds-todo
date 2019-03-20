import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TODO, TODOS } from '../gql';

export default function AddTodoMutation({ children }) {
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
      {children}
    </Mutation>
  );
}
