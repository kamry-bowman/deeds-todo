import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import MainNavigator from './components/MainNavigator';
import { ApolloClient, HttpLink, ApolloLink, concat } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
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
});

class App extends React.Component {
  constructor(props) {
    super(props);
    const link = new HttpLink({ uri: GQL_ENDPOINT });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: props.authData.signInUserSession.accessToken.jwtToken,
        },
      }));

      return forward(operation);
    });

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: concat(authMiddleware, link),
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <MainNavigator />
      </ApolloProvider>
    );
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
