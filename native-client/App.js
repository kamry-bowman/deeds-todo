import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import MainNavigator from './components/MainNavigator';
import { withAuthenticator } from 'aws-amplify-react-native';
import {
  userPoolId,
  region,
  userPoolWebClientId,
  GQL_ENDPOINT,
} from 'react-native-dotenv';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest; // code for debugging network requests

Amplify.configure({
  Auth: {
    userPoolId,
    region,
    userPoolWebClientId,
  },
  API: {
    graphql_endpoint: GQL_ENDPOINT,
  },
});

class App extends React.Component {
  componentDidMount() {
    console.log('App mounted');
  }
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
