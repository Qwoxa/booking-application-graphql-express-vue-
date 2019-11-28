<template>
  <div>
    <EventsCreateEvent v-if="localUser.isLoggedIn" />
    <EventsList />
  </div>
</template>

<script>
import EventsCreateEvent from '../components/EventsCreateEvent';
import EventsList from '../components/EventsList';
import { GET_LOCAL_USER } from '../graphql/queries';

export default {
  apollo: {
    localUser: {
      query: GET_LOCAL_USER,
    },
  },
  components: {
    EventsCreateEvent,
    EventsList,
  },
  data() {
    return {
      localUser: {
        isLoggedIn: false,
      },
    };
  },
};
</script>