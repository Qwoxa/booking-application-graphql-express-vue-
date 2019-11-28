<template>
  <li class="events__list-item">
    <div>
      <h1>{{ title }}</h1>
      <h2 v-if="price">${{ price }}</h2>
    </div>

    <div class="events__list-item__details">
      <button class="btn">View</button>
      <p v-if="localUser.isLoggedIn">Owner</p>
    </div>
  </li>
</template>

<script>
import { GET_LOCAL_USER } from '../graphql/queries';

export default {
  apollo: {
    localUser: {
      query: GET_LOCAL_USER,
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localUser: {
        loggedIn: false,
        userId: null,
      },
    };
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.events__list-item
  display: flex
  justify-content: space-between
  align-items: center
  flex-flow: row wrap
  margin: 1rem 0
  padding: 1rem
  border: 1px solid $main

  h1
    margin: 0
    font-size: 1.5rem

  h2
    margin: 0
    font-size: 1rem
    color: #777

.events__list-item__details
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center

  p
    margin: 0.5rem 0

</style>