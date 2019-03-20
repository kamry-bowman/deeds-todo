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

const EDIT_TODO = gql`
  mutation EditTodo(
    $title: String
    $description: String
    $completed: Boolean
    $id: ID!
  ) {
    username @client @export(as: "username")
    updateTodo(
      title: $title
      description: $description
      completed: $completed
      id: $id
    ) {
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

export { ADD_TODO, USER_TODOS, TODOS, EDIT_TODO };
