import Vue from 'vue';
import Router from 'vue-router';
import Auth from './views/Auth';
import NotFound from './views/NotFound';
import Events from './views/Events';
import Bookings from './views/Bookings';
import jwtDecode from 'jwt-decode';

import { client as apolloClient } from './main';
import { LOCAL_LOGOUT } from './graphql/queries';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'events' },
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: Bookings,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // if there's a token and we want to access auth page - stay on the same page
  if (token && to.name === 'auth') return next(from);

  // if there's no token and we want to access auth or events page - navigate to the requested page
  if (!token && (to.name === 'auth' || to.name === 'events')) return next();

  try {
    // if token is not valid - will throw an error
    const decodedToken = jwtDecode(token);
    const expired = decodedToken.exp < Date.now() / 1000;

    // if expired, also will throw
    if (expired) throw new Error('expired');

    // otherwise will navigate to the link
    next();
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    apolloClient.mutate({
      mutation: LOCAL_LOGOUT,
    });

    // location.reload();

    if (to.name === 'events') return next();

    // if not events
    return next('auth');
  }
});

export default router;
