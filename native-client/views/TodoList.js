import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AddTodo from '../components/AddTodo';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class TodoList extends React.Component {
  render() {
    return (
      <Query
        query={gql`
          query {
            todos {
              title
              id
              description
              completed
            }
          }
        `}
      >
        {({ loading, error, data, refetch }) => (
          <View style={styles.container}>
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
          </View>
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
