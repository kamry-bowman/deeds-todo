import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';
import { AppContext } from '../App';

export default class Header extends React.Component {
  render() {
    // const { authState } = this.props
    // const signedIn = (authState === 'signedIn')
    return (
      <View style={styles.container}>
        <AppContext>
          {({ signOut }) => (
            <Button title="Sign Out brother" onPress={signOut} />
          )}
        </AppContext>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    height: 60 + (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
