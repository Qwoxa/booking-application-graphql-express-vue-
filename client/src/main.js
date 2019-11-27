import Vue from 'vue';
import App from './App.vue';
import router from './router';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

import { typeDefs } from './graphql/schema';
import resolvers from './graphql/resolvers';

Vue.use(VueApollo);
Vue.config.productionTip = false;

const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem('token');

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  headers: getHeaders(),
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers,
  appTypename: true,
});

cache.writeData({
  data: {
    localUser: {
      __typename: 'LocalUser',
      isLoggedIn: Boolean(localStorage.getItem('token')),
    },
  },
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  render: h => h(App),
  apolloProvider,
  router,
}).$mount('#app');
