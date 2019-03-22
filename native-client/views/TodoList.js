import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import theme from '../theme';
import { Feather } from '@expo/vector-icons';
import AddTodo from '../components/AddTodo';
import EditTodoMutation from '../components/EditTodoMutation';
import DeleteTodosMutation from '../components/DeleteTodosMutation';
import MainLayout from '../components/MainLayout';
import ErrorMessage from '../components/ErrorMessage';
import TodoCard from '../components/TodoCard';
import Footer from '../components/Footer';
import { Query } from 'react-apollo';
import { USER_TODOS } from '../gql';

export default class TodoList extends React.Component {
  render() {
    return (
      <Query query={USER_TODOS}>
        {({ loading, error, data }) => {
          return (
            <MainLayout>
              <AddTodo navigation={this.props.navigation} />
              {error ? (
                <ErrorMessage />
              ) : loading ? (
                <ActivityIndicator size="large" color={theme.colors.mainDk} />
              ) : (
                <EditTodoMutation>
                  {editTodo => (
                    <FlatList
                      style={styles.list}
                      data={data.todos}
                      renderItem={({ item }) => {
                        return (
                          <TodoCard
                            todo={item}
                            editTodo={editTodo}
                            navigation={this.props.navigation}
                          />
                        );
                      }}
                      keyExtractor={item => item.id}
                    />
                  )}
                </EditTodoMutation>
              )}
              <Footer>
                <DeleteTodosMutation>
                  {deleteCompletedTodos => (
                    <TouchableOpacity
                      style={styles.archiveButton}
                      onPress={() => deleteCompletedTodos()}
                    >
                      <Text style={styles.archiveText}>Archive Complete</Text>
                      <Feather
                        style={styles.icon}
                        name="trash-2"
                        size={50}
                        color={theme.colors.mainDkOpaque}
                      />
                    </TouchableOpacity>
                  )}
                </DeleteTodosMutation>
              </Footer>
            </MainLayout>
          );
        }}
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
