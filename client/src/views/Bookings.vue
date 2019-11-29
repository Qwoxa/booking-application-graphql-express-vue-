<template>
  <div>
    <div class="booking__tabs">
      <div :class="{ active: isListTab }" @click="isListTab = true">List</div>
      <div :class="{ active: !isListTab }" @click="isListTab = false">Chart</div>
    </div>

    <BookingsList v-if="isListTab" />
    <BookingsChart v-else />
  </div>
</template>

<script>
import BookingsList from '../components/BookingsList';
import BookingsChart from '../components/BookingsChart';

export default {
  components: {
    BookingsList,
    BookingsChart,
  },
  data() {
    return {
      isListTab: true,
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