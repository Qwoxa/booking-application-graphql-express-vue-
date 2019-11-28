<template>
  <section>
    <ul class="events__list">
      <li v-for="event in events" :key="event._id">
        <EventListItem v-bind="event" />
      </li>
    </ul>
  </section>
</template>

<script>
import { GET_ALL_EVENTS } from '../graphql/queries';
import EventListItem from './EventsListItem';

export default {
  components: {
    EventListItem,
  },
  apollo: {
    events: {
      query: GET_ALL_EVENTS,
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.events__list
  width: 40rem
  max-width: 90%
  margin: 2rem auto
  list-style: none
  padding: 0
</style>