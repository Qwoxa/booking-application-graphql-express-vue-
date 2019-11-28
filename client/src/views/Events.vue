<template>
  <div class="events-control">
    <p>Share you own Events!</p>
    <button class="btn" @click="showModal = true">Create Event</button>

    <div v-show="showModal">
      <Backdrop />
      <Modal title="cool" :onCancel="onModalCancel">
        <template #content>Modal content</template>
      </Modal>
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal';
import Backdrop from '../components/Backdrop';

export default {
  components: {
    Backdrop,
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    onModalCancel() {
      this.showModal = false;
    },
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
