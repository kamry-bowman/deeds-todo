import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppContext from './Context';
import theme from '../theme';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('TodoList')}
        >
          <Text style={styles.heading}>Deeds</Text>
        </TouchableOpacity>
        <AppContext>
          {({ signOut }) => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="md-exit" size={44} color={theme.colors.mainDk} />
            </TouchableOpacity>
          )}
        </AppContext>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    paddingLeft: theme.padding.outer,
    paddingRight: theme.padding.outer,
    height: 60 + (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight),
    backgroundColor: theme.colors.mainLt,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  heading: {
    fontFamily: 'nunito900',
    color: theme.colors.mainDk,
    fontSize: 35,
  },
});
