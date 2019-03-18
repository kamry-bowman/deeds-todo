import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import MainNavigator from './components/MainNavigator';
import Header from './components/Header';
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
    const cache = new InMemoryCache();

    this.client = new ApolloClient({
      cache,
      link: concat(authMiddleware, link),
      resolvers: {
        Query: {
          username: (root, args, { cache }) => {
            const query = gql`
              {
                username
              }
            `;
            console.log(query);
            try {
              cache.readQuery(query);
            } catch (err) {
              console.log(err);
            }
          },
        },
      },
    });

    cache.writeData({
      data: {
        username: props.authData.username,
      },
    });
  }

  componentDidMount() {
    this.createUserIfNeeded();
  }

  async createUserIfNeeded() {
    try {
      const { data } = await this.client.mutate({
        mutation: gql`
          mutation {
            createUser(username: "${this.props.authData.username}") {
              username
            }
          }
        `,
      });
      console.log('created', data);
    } catch (err) {
      // this catches an error, which will occur in all cases except when
      // the user is a new user to the database, in which case the new user
      // gets created. This avoids a second server request.
    }
  }

  signOut = () => {
    Auth.signOut()
      .then(res => {
        console.log(res);
        this.props.onStateChange('signedOut');
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <ApolloProvider client={this.client}>
        <MainNavigator  />
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
  signUpConfig: {
    header: 'Signup for Deeds',
    hiddenDefaults: ['phone_number'],
  },
});
