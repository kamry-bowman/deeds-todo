import React from 'react';
import { Font, AppLoading } from 'expo';
import Amplify, { Auth } from 'aws-amplify';
import AppContext from './components/Context';
import MainNavigator from './components/MainNavigator';
import AddApollo from './components/AddApollo';
import { Authenticator } from 'aws-amplify-react-native';
import { awsCustom } from './theme';
import { userPoolId, region, userPoolWebClientId } from 'react-native-dotenv';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest; /*debugging line*/

Amplify.configure({
  Auth: {
    userPoolId,
    region,
    userPoolWebClientId,
  },
});

export default class App extends React.Component {
  state = {
    assetsLoaded: false,
    authState: null,
    authData: null,
  };

  handleAuthStateChange = (state, data) => {
    this.setState({ authState: state, authData: data });
  };

  signOut = () => {
    Auth.signOut()
      .then(res => {
        this.handleAuthStateChange('signedOut', null);
      })
      .catch(err => err);
  };

  componentDidMount() {
    Font.loadAsync({
      nunito900: require('./assets/fonts/Nunito-Black.ttf'),
      nunito700: require('./assets/fonts/Nunito-SemiBold.ttf'),
      nunito600: require('./assets/fonts/Nunito-Bold.ttf'),
    })
      .then(() => this.setState({ assetsLoaded: true }))
      .catch(err => err);
  }

  render() {
    const { assetsLoaded, authState, authData } = this.state;
    return authState !== 'signedIn' ? (
      <Authenticator
        signUpConfig={{
          header: 'Signup for Deeds',
          hiddenDefaults: ['phone_number'],
        }}
        theme={awsCustom}
        onStateChange={this.handleAuthStateChange}
      />
    ) : assetsLoaded ? (
      <AddApollo authData={authData}>
        <AppContext.Provider value={{ signOut: this.signOut }}>
          <MainNavigator />
        </AppContext.Provider>
      </AddApollo>
    ) : (
      <AppLoading />
    );
  }
}
