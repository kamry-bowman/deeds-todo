import React from 'react';
import gql from 'graphql-tag';
import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MainLayout from './MainLayout';
import { ApolloClient, HttpLink, ApolloLink, concat } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GQL_ENDPOINT } from 'react-native-dotenv';
import { USERNAME } from '../gql';
import theme from '../theme';

export default class AddApollo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedUser: false,
    };
    const { username } = props.authData;
    const token = props.authData.signInUserSession.accessToken.jwtToken;
    const link = new HttpLink({
      uri: true
        ? GQL_ENDPOINT
        : 'http://localhost:4000/' /*.replace('localhost', '10.0.2.2')*/,
    });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: token,
        },
      }));
      return forward(operation);
    });
    const cache = new InMemoryCache({
      cacheRedirects: {
        Query: {
          todo: (root, { id }, { getCacheKey }) => {
            return getCacheKey({ __typename: 'Todo', id });
          },
        },
      },
    });

    this.client = new ApolloClient({
      cache,
      link: concat(authMiddleware, link),
      resolvers: {
        Query: {
          username: (root, args, { cache }) => {
            try {
              cache.readQuery({ query: USERNAME });
            } catch (err) {
              return err;
            }
          },
        },
      },
    });

    cache.writeData({
      data: {
        username,
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
          mutation CreateUser($username: String!) {
            createUser(username: $username) {
              username
            }
          }
        `,
        variables: {
          username: this.props.authData.username,
        },
      });
      this.setState({ checkedUser: true });
    } catch (err) {
      this.setState({ checkedUser: true });
      // this catches an error, which will occur in all cases except when
      // the user is a new user to the database, in which case the new user
      // gets created. This avoids a second server request.
    }
  }

  render() {
    return this.state.checkedUser ? (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    ) : (
      <MainLayout>
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.mainDk} />
        </View>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
