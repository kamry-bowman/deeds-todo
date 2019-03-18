import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Amplify, { API, Auth } from 'aws-amplify';
import MainNavigator from './components/MainNavigator';
import AddApollo from './components/AddApollo';

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

const AppContext = React.createContext({ signOut: () => {} });

function App(props) {
  const signOut = () => {
    Auth.signOut()
      .then(res => {
        props.onStateChange('signedOut');
      })
      .catch(err => console.log(err));
  };

  return (
    <AddApollo authData={props.authData}>
      <AppContext.Provider value={{ signOut: signOut }}>
        <MainNavigator />
      </AppContext.Provider>
    </AddApollo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const WrappedApp = withAuthenticator(App, {
  signUpConfig: {
    header: 'Signup for Deeds',
    hiddenDefaults: ['phone_number'],
  },
});
export { WrappedApp as default, AppContext };
