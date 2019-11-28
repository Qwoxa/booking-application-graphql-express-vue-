<template>
  <div class="events__control">
    <EventsCreateEvent />

    <section class="events__list">
      <ul></ul>
    </section>
  </div>
</template>

<script>
import EventsCreateEvent from '../components/EventsCreateEvent';

export default {
  components: {
    EventsCreateEvent,
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
