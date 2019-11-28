import gql from 'graphql-tag';

const resolvers = {};

const typeDefs = gql`
  type LocalUser {
    isLoggedIn: Boolean!
  }
`;

export { resolvers, typeDefs };
