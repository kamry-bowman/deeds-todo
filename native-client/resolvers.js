import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    username: String!
  }
`;
