import Vue from 'vue';
import App from './App.vue';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import VueApollo from 'vue-apollo';

Vue.use(VueApollo);
Vue.config.productionTip = false;

const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem('apollo-token');

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  headers: getHeaders(),
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  appTypename: true,
});

const apolloProvider = new VueApollo({
  defaultClient: client,
});

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app');
