import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AddTodo from '../components/AddTodo';

export default class TodoList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>TodoList</Text>
        <AddTodo />
        <Button
          title="Single Todo"
          onPress={() => this.props.navigation.navigate('SingleTodo')}
        />
      </View>
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
