<template>
  <header class="main_navigation__wrapper">
    <div class="main_navigation">
      <div class="main_navigation__logo">
        <h1>EasyEvent</h1>
      </div>
      <div class="main_navigation__items">
        <ul>
          <li v-for="[pathName, path] in links" v-bind:key="pathName">
            <router-link :to="path">{{ pathName }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { GET_LOCAL_USER } from '../graphql/queries';

export default {
  apollo: {
    localUser: {
      query: GET_LOCAL_USER,
    },
  },
  data() {
    return {
      links: [],
      noAuth: [['Authenticate', '/auth']],
      protected: [
        ['Events', '/events'],
        ['Bookings', '/bookings'],
        ['Logout', '/logout'], // handled in router
      ],
    };
  },
  created() {
    this.links = this.localUser.isLoggedIn ? this.protected : this.noAuth;
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.main_navigation__wrapper
  width: 100%;
  background-color: $main;
  color: $text;

.main_navigation
  display: flex;
  align-items: center;
  height: 4rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;

.main_navigation__logo
  h1
    margin: 0;
    font-size: 1.5rem;

.main_navigation__items
  margin-left: 2rem;

  ul
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;

  li
    margin: 0;
    height: 100%;

  a
    text-decoration: none;
    display: block;
    padding: 0 1rem;
    line-height: 4rem;
    height: 100%;
    color: $text;

    &:hover
      background-color: lighten($main, 15);

  .router-link-active
    background: lighten($main, 15);
</style>
