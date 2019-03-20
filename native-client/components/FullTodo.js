import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Footer from './Footer';
import theme from '../theme';

export default function FullTodo({ todo, toggleEdit, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{todo.title}</Text>
      {todo.description ? (
        <Text style={styles.bodyText}>
          {'Description: ' + todo.description}
        </Text>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.bodyTextPlaceholder}>No description yet.</Text>
          <Text style={styles.bodyTextPlaceholder}>Click below to edit.</Text>
        </View>
      )}
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
    paddingLeft: theme.padding.outer,
    paddingRight: theme.padding.outer,
    paddingTop: 20,
    flex: 1,
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
