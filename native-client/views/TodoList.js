import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AddTodo from '../components/AddTodo';
import MainLayout from '../components/MainLayout';
import { Query } from 'react-apollo';
import { USER_TODOS } from '../gql';

export default class TodoList extends React.Component {
  render() {
    return (
      <Query query={USER_TODOS}>
        {({ loading, error, data, refetch }) => (
          <MainLayout>
            <Button title="Refetch" onPress={() => refetch()} />
            <Text>TodoList</Text>
            <AddTodo />
            <Button
              title="Single Todo"
              onPress={() => this.props.navigation.navigate('SingleTodo')}
            />
            {error ? (
              <Text>error!</Text>
            ) : loading ? (
              <Text>loading...</Text>
            ) : (
              data.todos.map(todo => (
                <Text key={todo.id}>
                  {`${todo.title} - ${todo.description}`}
                </Text>
              ))
            )}
          </MainLayout>
        )}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
