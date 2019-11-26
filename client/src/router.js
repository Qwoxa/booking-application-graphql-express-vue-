import Vue from 'vue';
import Router from 'vue-router';
import Auth from './views/Auth';
import NotFound from './views/NotFound';
import Events from './views/Events';
import Bookings from './views/Bookings';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'auth' },
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

// router.beforeEach((to, from, next) => {
//   if (to.path === '/' || to.path === '/callback' || auth.isAuthenticated()) {
//     return next();
//   }

//   auth.login({ target: to.path });
// });

export default router;
