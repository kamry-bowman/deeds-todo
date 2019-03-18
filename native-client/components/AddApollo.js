import React from 'react';
import gql from 'graphql-tag';
import { ApolloClient, HttpLink, ApolloLink, concat } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GQL_ENDPOINT } from 'react-native-dotenv';

export default class AddApollo extends React.Component {
  constructor(props) {
    super(props);
    const { username } = this.props.authData;
    const token = this.props.authData.signInUserSession.accessToken.jwtToken;
    const link = new HttpLink({
      uri: GQL_ENDPOINT.replace('localhost', '10.0.2.2'),
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
    const cache = new InMemoryCache();

    this.client = new ApolloClient({
      cache,
      link: concat(authMiddleware, link),
      resolvers: {
        Query: {
          username: (root, args, { cache }) => {
            const query = gql`
              query {
                username
              }
            `;
            try {
              cache.readQuery({ query });
            } catch (err) {
              console.log('query error', err);
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
          mutation {
            createUser(username: ${username}) {
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

  render() {
    return (
      <ApolloProvider client={this.client}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}