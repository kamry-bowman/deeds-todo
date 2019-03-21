import gql from 'graphql-tag';

const USERNAME = gql`
  query {
    username
  }
`;

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
      date
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
      date
    }
  }
`;

const TODOS = gql`
  query {
    todos(username: $username) {
      title
      description
      id
      completed
      date
    }
  }
`;

const TODO = gql`
  query Todo($id: ID!) {
    todo(id: $id) {
      title
      description
      id
      completed
      date
    }
  }
`;

const EDIT_TODO = gql`
  mutation EditTodo(
    $title: String
    $description: String
    $completed: Boolean
    $id: ID!
    $date: DateTime
  ) {
    updateTodo(
      title: $title
      description: $description
      completed: $completed
      id: $id
      date: $date
    ) {
      title
      description
      id
      completed
      user {
        username
      }
      date
    }
  }
`;

const DELETE_COMPLETED_TODOS = gql`
  mutation DeleteTodos($username: String!) {
    username @client @export(as: "username")
    deleteCompletedTodos(username: $username) {
      title
      description
      id
      completed
      date
      user {
        username
      }
    }
  }
`;

export {
  USERNAME,
  ADD_TODO,
  USER_TODOS,
  TODOS,
  TODO,
  EDIT_TODO,
  DELETE_COMPLETED_TODOS,
};
