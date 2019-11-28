<template>
  <section>
    <ul class="events__list">
      <EventListItem v-for="event in events" :key="event._id" v-bind="event" />
      <EventListItem v-if="events.length === 0" title="No items" description="There's no items" />
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
  data() {
    return {
      events: [],
    };
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