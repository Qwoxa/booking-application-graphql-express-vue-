<template>
  <div class="events-control">
    <p>Share you own Events!</p>
    <button class="btn">Create Event</button>
    <Modal title="cool" />
  </div>
</template>

<script>
import Modal from '../components/Modal';

export default {
  components: {
    Modal,
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.events-control
  text-align: center;
  border: 1px solid $main;
  padding: 1rem;
  margin: 2rem auto;
  width: 30rem;
  max-width: 80%;
</style>
