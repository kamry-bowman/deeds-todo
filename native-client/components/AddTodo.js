import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import AddTodoMutation from './AddTodoMutation';
import { Ionicons } from '@expo/vector-icons';
import theme from '../theme';

const initialState = {
  title: '',
  description: '',
};

export default class AddTodo extends React.Component {
  state = { ...initialState };

  render() {
    return (
      <AddTodoMutation>
        {createTodo => {
          const handleSubmit = () => {
            createTodo({
              variables: {
                title: this.state.title,
                description: this.state.description,
              },
            })
              .then(result => {
                this.props.navigation.navigate('SingleTodo', {
                  id: result.data.createTodo.id,
                });
              })
              .catch(err => err);
          };
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={handleSubmit}>
                <Ionicons
                  style={styles.addButton}
                  name="md-add-circle"
                  size={50}
                  color={theme.colors.mainDk}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Enter a todo..."
                placeholderTextColor={theme.colors.mainDkTrans}
                style={styles.input}
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </View>
          );
        }}
      </AddTodoMutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: theme.padding.outer,
    marginRight: theme.padding.outer,
    paddingBottom: 0,
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.mainDkTrans,
    paddingTop: theme.padding.headerClearance,
  },
  addButton: {
    width: 60,
    height: 50,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    color: theme.colors.mainDkOpaque,
    fontFamily: 'nunito700',
    fontSize: 25,
    textAlign: 'center',
  },
});
