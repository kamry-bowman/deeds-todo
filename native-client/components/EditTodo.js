import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Footer from './Footer';
import theme from '../theme';

export default class EditTodo extends React.Component {
  state = {
    title: this.props.todo.title,
    description: this.props.todo.description,
  };

  updateInputs = ({ name, text }) => {
    this.setState({
      [name]: text,
    });
  };

  render() {
    const { toggleEdit, navigation } = this.props;
    const { title, description } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.editMode}>Edit Mode</Text>
        <TextInput
          style={styles.heading}
          value={title}
          onChangeText={text => this.updateInputs({ text, name: 'title' })}
        />
        <TextInput
          style={styles.bodyText}
          value={description}
          multiline
          textAlignVertical="top"
          placeholder="Description here"
          placeholderTextColor={theme.colors.mainDkTrans}
          onChangeText={text =>
            this.updateInputs({ text, name: 'description' })
          }
          name="description"
        />
        <Footer>
          <View style={styles.footerButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                style={styles.icon}
                name="md-arrow-round-back"
                size={50}
                color={theme.colors.mainDkOpaque}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleEdit}>
              <AntDesign
                style={styles.icon}
                name="edit"
                size={50}
                color={theme.colors.mainDkOpaque}
              />
            </TouchableOpacity>
          </View>
        </Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editMode: {
    width: '100%',
    backgroundColor: theme.colors.mainDk,
    color: theme.colors.mainLt,
    fontFamily: 'nunito700',
    fontSize: 22,
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'nunito900',
    fontSize: 46,
    color: theme.colors.mainDkOpaque,
    textAlign: 'center',
    paddingTop: theme.padding.headerClearance,
    backgroundColor: theme.colors.lighten,
  },
  bodyText: {
    paddingLeft: theme.padding.outer,
    paddingRight: theme.padding.outer,
    paddingTop: 20,
    flex: 1,
    fontFamily: 'nunito600',
    fontSize: 22,
    color: theme.colors.mainDkOpaque,
    backgroundColor: theme.colors.lighten,
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
