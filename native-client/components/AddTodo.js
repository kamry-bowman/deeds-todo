import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

export default class TodoList extends React.Component {
  state = {
    text: '',
  };
  submit = () => {
    Alert.alert(this.state.text);
    this.setState({ text: '' });
  };
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>Add a todo</Text>
        <TextInput
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
        <Button title="Todo List" onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
