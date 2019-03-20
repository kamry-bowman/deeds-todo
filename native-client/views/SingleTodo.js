import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainLayout from '../components/MainLayout';
import { TODO } from '../gql';
import { Query } from 'react-apollo';

export default class TodoList extends React.Component {
  render() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    console.log(id);

    return (
      <Query query={TODO} variables={{ id }}>
        {({ loading, error, data }) => (
          <MainLayout>
            {error ? (
              <Text>error!</Text>
            ) : loading ? (
              <Text>loading...</Text>
            ) : (
              <View style={styles.container}>
                <Text>{data.todo.title}</Text>
              </View>
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
