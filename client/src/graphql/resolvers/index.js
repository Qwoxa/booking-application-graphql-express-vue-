import { GET_LOCAL_USER } from '../queries';

const resolver = {
  Mutation: {
    localLogin: (parent, args, { cache }) => {
      cache.writeQuery({ query: GET_LOCAL_USER, data: { isLoggedIn: true } });
      return true;
    },
  },
};

export default resolver;
