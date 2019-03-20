import React from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_TODO, TODOS } from '../gql';

export default function EditTodoMutation({ children }) {
  return (
    <Mutation
      mutation={EDIT_TODO}
      update={(cache, { data: { updateTodo } }) => {
        const {
          user: { username },
          ...updatedTodo
        } = updateTodo;
        const { todos } = cache.readQuery({
          query: TODOS,
          variables: {
            username,
          },
        });

        const updatedTodos = todos.map(todo =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
        cache.writeQuery({
          query: TODOS,
          variables: {
            username,
          },
          data: { todos: updatedTodos },
        });
      }}
    >
      {children}
    </Mutation>
  );
}
