import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../App';
import theme from '../theme';

export default class Header extends React.Component {
  render() {
    // const { authState } = this.props
    // const signedIn = (authState === 'signedIn')
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Deeds</Text>
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
