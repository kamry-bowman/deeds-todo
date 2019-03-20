import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import theme from '../theme';
import { Feather } from '@expo/vector-icons';
import AddTodo from '../components/AddTodo';
import EditTodoMutation from '../components/EditTodoMutation';
import MainLayout from '../components/MainLayout';
import TodoCard from '../components/TodoCard';
import Footer from '../components/Footer';
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
            <Footer>
              <TouchableOpacity style={styles.archiveButton} onPress={() => {}}>
                <Text style={styles.archiveText}>Archive Complete</Text>
                <Feather
                  style={styles.icon}
                  name="trash-2"
                  size={50}
                  color={theme.colors.mainDkOpaque}
                />
              </TouchableOpacity>
            </Footer>
          </MainLayout>
        )}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  archiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  archiveText: {
    flex: 1,
    color: theme.colors.mainDkOpaque,
    fontFamily: 'nunito700',
    fontSize: 25,
  },
});
