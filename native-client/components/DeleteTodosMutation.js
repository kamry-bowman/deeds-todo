import React from 'react';
import { Mutation } from 'react-apollo';
import { DELETE_COMPLETED_TODOS, TODOS, USERNAME } from '../gql';

export default function DeleteTodosMutation({ children }) {
  return (
    <Mutation
      mutation={DELETE_COMPLETED_TODOS}
      update={(cache, { data: { deleteCompletedTodos } }) => {
        const { username } = cache.readQuery({
          query: USERNAME,
        });

        cache.writeQuery({
          query: TODOS,
          variables: {
            username,
          },
          data: { todos: deleteCompletedTodos },
        });
      }}
    >
      {children}
    </Mutation>
  );
}
