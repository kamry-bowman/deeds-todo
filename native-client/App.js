import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify from 'aws-amplify';
import MainNavigator from './components/MainNavigator';
import { withAuthenticator } from 'aws-amplify-react-native';
import { userPoolId, region, userPoolWebClientId } from 'react-native-dotenv';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest; // code for debugging network requests

Amplify.configure({
  Auth: {
    userPoolId,
    region,
    userPoolWebClientId,
  },
});

class App extends React.Component {
  render() {
    return <MainNavigator />;
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

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: {
    header: 'Signup for Deeds',
    hiddenDefaults: ['phone_number'],
  },
});
