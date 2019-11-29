import gql from 'graphql-tag';
import { GET_LOCAL_USER } from '../queries';

const resolvers = {
  Mutation: {
    localLogin: (_, { userId }, { cache }) => {
      const data = cache.readQuery({ query: GET_LOCAL_USER });
      data.localUser = { __typename: 'LocalUser', isLoggedIn: true, userId };

      cache.writeQuery({
        query: GET_LOCAL_USER,
        data,
      });
    },
    localLogout: (_, second, { cache }) => {
      const data = cache.readQuery({ query: GET_LOCAL_USER });
      data.localUser = {
        __typename: 'LocalUser',
        isLoggedIn: false,
        userId: null,
      };

      cache.writeQuery({
        query: GET_LOCAL_USER,
        data,
      });
    },
  },
};

const typeDefs = gql`
  type LocalUser {
    isLoggedIn: Boolean!
    userId: String!
  }

  type Mutation {
    localLogin(userId: ID!): LocalUser!
    localLogout: LocalUser!
  }
`;

export { resolvers, typeDefs };
