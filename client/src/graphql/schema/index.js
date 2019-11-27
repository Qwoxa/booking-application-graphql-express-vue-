import gql from 'graphql-tag';

export const typeDefs = gql`
  type LocalUser {
    isLoggedIn: Boolean!
  }
`;
