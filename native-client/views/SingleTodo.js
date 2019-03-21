import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import MainLayout from '../components/MainLayout';
import FullTodo from '../components/FullTodo';
import EditTodo from '../components/EditTodo';
import ErrorMessage from '../components/ErrorMessage';
import EditTodoMutation from '../components/EditTodoMutation';
import { TODO } from '../gql';
import theme from '../theme';

export default class TodoList extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    this.setState(({ editing }) => ({ editing: !editing }));
  };

  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    const { editing } = this.state;

    return (
      <Query query={TODO} variables={{ id }}>
        {({ loading, error, data }) => (
          <MainLayout>
            {error ? (
              <ErrorMessage />
            ) : loading ? (
              <ActivityIndicator />
            ) : editing ? (
              <EditTodoMutation>
                {editTodo => (
                  <EditTodo
                    todo={data.todo}
                    toggleEdit={this.toggleEdit}
                    navigation={this.props.navigation}
                    editTodo={editTodo}
                  />
                )}
              </EditTodoMutation>
            ) : (
              <FullTodo
                todo={data.todo}
                toggleEdit={this.toggleEdit}
                navigation={this.props.navigation}
              />
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
  },
  heading: {
    fontFamily: 'nunito900',
    fontSize: 46,
    color: theme.colors.mainDk,
    textAlign: 'center',
    paddingTop: theme.padding.headerClearance,
  },
  bodyText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'nunito600',
    fontSize: 22,
    color: theme.colors.mainDk,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyTextPlaceholder: {
    textAlign: 'center',
    fontFamily: 'nunito600',
    fontSize: 22,
    color: theme.colors.mainDkOpaque,
  },
  footerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  archiveText: {
    flex: 1,
    color: theme.colors.mainDkOpaque,
    fontFamily: 'nunito700',
    fontSize: 25,
  },
});
