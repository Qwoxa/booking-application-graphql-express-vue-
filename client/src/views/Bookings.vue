<template>
  <div>
    <div class="booking__tabs">
      <div :class="{ active: isListTab }" @click="isListTab = true">List</div>
      <div :class="{ active: !isListTab }" @click="isListTab = false">Chart</div>
    </div>

    <BookingsList v-if="isListTab" :bookings="bookings" />
    <BookingsChart v-else :bookings="bookings" />
  </div>
</template>

<script>
import BookingsList from '../components/BookingsList';
import BookingsChart from '../components/BookingsChart';
import { GET_ALL_BOOKINGS } from '../graphql/queries';

export default {
  components: {
    BookingsList,
    BookingsChart,
  },
  apollo: {
    bookings: {
      query: GET_ALL_BOOKINGS,
    },
  },
  data() {
    return {
      isListTab: true,
      bookings: [],
    };
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.booking__tabs
  display: flex
  margin: 1rem auto
  width: 50%


  div
    margin: 0 1rem
    font-size: 1.2rem
    cursor: pointer
    flex-grow: 1
    text-align: center
    padding-bottom: 3px;

  .active
    color: $main
    border-bottom: 2px solid $main

  
</style>