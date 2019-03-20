import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import theme from '../theme';
import AddTodo from '../components/AddTodo';
import EditTodoMutation from '../components/EditTodoMutation';
import MainLayout from '../components/MainLayout';
import TodoCard from '../components/TodoCard';
import { Query } from 'react-apollo';
import { USER_TODOS } from '../gql';

export default class TodoList extends React.Component {
  render() {
    return (
      <Query query={USER_TODOS}>
        {({ loading, error, data, refetch }) => (
          <MainLayout>
            <AddTodo />
            {/* <Button
              title="Single Todo"
              onPress={() => this.props.navigation.navigate('SingleTodo')}
            /> */}
            {error ? (
              <Text>error!</Text>
            ) : loading ? (
              <Text>loading...</Text>
            ) : (
              <EditTodoMutation>
                {editTodo => (
                  <FlatList
                    style={styles.list}
                    data={data.todos}
                    renderItem={({ item }) => {
                      return <TodoCard todo={item} editTodo={editTodo} />;
                    }}
                    keyExtractor={item => item.id}
                  />
                )}
              </EditTodoMutation>
            )}
          </MainLayout>
        )}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  list: {},
});
