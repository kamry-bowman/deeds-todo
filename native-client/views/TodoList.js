import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TodoList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>TodoList</Text>
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
