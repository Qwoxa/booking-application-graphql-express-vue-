<template>
  <section>
    <ul class="events__list">
      <EventListItem
        v-for="event in events"
        :key="event._id"
        :isCreator="localUser.userId === event.creator._id"
        v-bind="event"
      />
      <EventListItem
        v-if="events.length === 0"
        title="No items"
        description="There's no items"
      />
    </ul>
  </section>
</template>

<script>
import { GET_ALL_EVENTS, GET_LOCAL_USER } from '../graphql/queries';
import EventListItem from './EventsListItem';

export default {
  apollo: {
    localUser: {
      query: GET_LOCAL_USER,
    },
    events: {
      query: GET_ALL_EVENTS,
    },
  },
  components: {
    EventListItem,
  },
  data() {
    return {
      localUser: {
        loggedIn: false,
        userId: null,
      },
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
