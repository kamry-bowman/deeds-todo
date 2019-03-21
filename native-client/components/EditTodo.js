import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  DatePickerAndroid,
} from 'react-native';

import { Ionicons, Feather } from '@expo/vector-icons';
import Footer from './Footer';
import theme from '../theme';
import { formatDate } from '../utils';

export default class EditTodo extends React.Component {
  state = {
    title: this.props.todo.title,
    description: this.props.todo.description,
    date: this.props.todo.date,
  };

  updateInputs = ({ name, text }) => {
    this.setState({
      [name]: text,
    });
  };

  editDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(2020, 4, 25),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({ date: new Date(year, month, day) });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  submit = () => {
    const { title, description, date } = this.state;
    const changes = {};
    // collect changes in an object
    if (title !== this.props.todo.title) {
      changes.title = title;
    }
    if (description !== this.props.todo.description) {
      changes.description = description;
    }
    if (date !== this.props.todo.date) {
      changes.date = date;
    }
    // only proceed if something changed
    if (Object.keys(changes).length) {
      this.props
        .editTodo({
          variables: {
            ...changes,
            id: this.props.todo.id,
          },
        })
        .then(this.props.toggleEdit)
        .catch(console.log);
    }
  };

  render() {
    const { navigation } = this.props;
    const { title, description, date } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.editMode}>Edit Mode</Text>
        <TextInput
          style={styles.heading}
          value={title}
          onChangeText={text => this.updateInputs({ text, name: 'title' })}
        />
        <TouchableWithoutFeedback onPress={this.editDate}>
          <Text style={styles.date}>{date ? formatDate(date) : '-'}</Text>
        </TouchableWithoutFeedback>
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
            <TouchableOpacity onPress={this.editDate}>
              <Ionicons
                style={styles.icon}
                name="md-calendar"
                size={50}
                color={theme.colors.mainDkOpaque}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.submit()}>
              <Feather
                style={styles.icon}
                name="save"
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
  date: {
    fontFamily: 'nunito600',
    fontSize: 30,
    color: theme.colors.mainDkOpaque,
    textAlign: 'center',
    backgroundColor: theme.colors.lighten,
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
