import gql from 'graphql-tag';

const ADD_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String
    $username: String!
  ) {
    username @client @export(as: "username")
    createTodo(title: $title, description: $description, username: $username) {
      title
      description
      id
      completed
      user {
        username
      }
    }
  }
`;

const USER_TODOS = gql`
  query userTodos($username: String!) {
    username @client @export(as: "username")
    todos(username: $username) {
      title
      description
      id
      completed
    }
  }
`;

const TODOS = gql`
  {
    todos(username: $username) {
      title
      description
      id
      completed
    }
  }
`;

export { ADD_TODO, USER_TODOS, TODOS };
