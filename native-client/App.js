import React from 'react';
import { StyleSheet, View } from 'react-native';
import Amplify, { API } from 'aws-amplify';
import MainNavigator from './components/MainNavigator';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
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

// const httpLink = createHttpLink({ uri: GQL_ENDPOINT });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  uri: GQL_ENDPOINT,
  cache: new InMemoryCache(),
});

class App extends React.Component {
  componentDidMount() {
    console.log('App mounted');
    client
      .query({
        query: gql`
          query {
            todos {
              title
              id
              description
              completed
            }
          }
        `,
      })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <ApolloProvider client={client}>
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
