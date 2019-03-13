import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class TodoList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>Single Todo</Text>
        <Button
          title="Todo List"
          onPress={() => this.props.navigation.navigate('TodoList')}
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
