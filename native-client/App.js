import React from 'react';
import { Font, AppLoading } from 'expo';
import Amplify, { Auth } from 'aws-amplify';
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

class App extends React.Component {
  state = {
    assetsLoaded: false,
  };

  signOut = () => {
    Auth.signOut()
      .then(res => {
        this.props.onStateChange('signedOut');
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    Font.loadAsync({
      nunito900: require('./assets/fonts/Nunito-Black.ttf'),
      nunito700: require('./assets/fonts/Nunito-SemiBold.ttf'),
      nunito600: require('./assets/fonts/Nunito-Bold.ttf'),
    })
      .then(() => this.setState({ assetsLoaded: true }))
      .catch(console.log);
  }

  render() {
    return this.state.assetsLoaded ? (
      <AddApollo authData={this.props.authData}>
        <AppContext.Provider value={{ signOut: this.signOut }}>
          <MainNavigator />
        </AppContext.Provider>
      </AddApollo>
    ) : (
      <AppLoading />
    );
  }
}

const WrappedApp = withAuthenticator(App, {
  signUpConfig: {
    header: 'Signup for Deeds',
    hiddenDefaults: ['phone_number'],
  },
});
export { WrappedApp as default, AppContext };
