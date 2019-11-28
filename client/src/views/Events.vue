<template>
  <div class="events__control">
    <EventsCreateEvent />
    <EventsList />
  </div>
</template>

<script>
import EventsCreateEvent from '../components/EventsCreateEvent';
import EventsList from '../components/EventsList';

export default {
  components: {
    EventsCreateEvent,
    EventsList,
  },
};
</script>

<style lang="sass">
@import '../sass/colors'


.events__control
  text-align: center
  border: 1px solid $main
  padding: 1rem
  margin: 2rem auto
  width: 30rem
  max-width: 80%
</style>
