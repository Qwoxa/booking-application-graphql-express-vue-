<template>
  <section>
    <ul class="events__list">
      <!-- Regular -->
      <EventListItem
        v-for="event in events"
        :key="event._id"
        :isCreator="localUser.userId === event.creator._id"
        :displayDetails="true"
        :onShowDetails="showDetails"
        v-bind="event"
      />
      <!-- No entries -->
      <EventListItem
        v-if="events.length === 0 && !$apollo.loading"
        title="No items"
        :displayDetails="false"
      />
      <!-- Loading -->
      <EventListItem v-if="$apollo.loading" title="Loading.." :displayDetails="false" />
    </ul>

    <EventListViewItem
      :isOpen="isOpen"
      :hideModal="hideModal"
      :bookEvent="bookEvent"
      :isLoggedIn="localUser.isLoggedIn"
      v-bind="details"
    />
  </section>
</template>

<script>
import { GET_ALL_EVENTS, GET_LOCAL_USER, BOOK_EVENT } from '../graphql/queries';
import EventListItem from './EventsListItem';
import EventListViewItem from './EventsListViewItem';

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
    EventListViewItem,
    EventListItem,
  },
  data() {
    return {
      localUser: {
        isLoggedIn: false,
        userId: null,
      },
      details: null,
      isOpen: false,
      events: [],
    };
  },
  methods: {
    showDetails(id) {
      this.details = this.events.find(e => e._id === id);
      this.isOpen = true;
    },
    hideModal() {
      this.isOpen = false;
    },
    bookEvent(eventId) {
      this.$apollo.mutate({
        mutation: BOOK_EVENT,
        variables: {
          eventId,
        },
      });
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

.view-event__modal
  h1
    margin: 0
    font-size: 1.5rem

  h2
    margin: 0
    font-size: 1rem
    color: #777
</style>
