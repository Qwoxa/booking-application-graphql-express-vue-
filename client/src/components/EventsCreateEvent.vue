<template>
  <section class="events__create">
    <p>Share you own Events!</p>
    <button class="btn" @click="showModal = true">Create Event</button>

    <div v-show="showModal">
      <Backdrop />
      <Modal
        title="Create New Event"
        :onCancel="onModalCancel"
        :onConfirm="onModalConfirm"
      >
        <template #content>
          <EventsCreateForm :input="input" :error="error" />
        </template>
      </Modal>
    </div>
  </section>
</template>

<script>
import Modal from './BaseModal';
import Backdrop from './BaseBackdrop';
import EventsCreateForm from './EventsCreateForm';
import { CREATE_EVENT, GET_ALL_EVENTS } from '../graphql/queries';

export default {
  components: {
    Backdrop,
    Modal,
    EventsCreateForm,
  },
  data() {
    return {
      showModal: false,
      input: {
        title: '',
        description: '',
        price: '',
        date: '',
      },
      error: null,
    };
  },
  methods: {
    onModalCancel() {
      this.showModal = false;
    },
    onModalConfirm() {
      try {
        const data = Object.entries(this.input).map(([key, val]) => {
          if (val.trim() === '') throw new Error(`Validation failed at ${key}`);

          if (key === 'date') return [key, new Date(val)];
          else if (key === 'price') return [key, Number(val)];
          else return [key, val];
        });

        // validation passed
        this.error = null;

        this.$apollo.mutate({
          mutation: CREATE_EVENT,
          variables: {
            eventInput: Object.fromEntries(data),
          },
          update: (cache, { data: { createEvent } }) => {
            const data = cache.readQuery({ query: GET_ALL_EVENTS });
            data.events = [createEvent, ...data.events];
            cache.writeQuery({ query: GET_ALL_EVENTS, data });
          },
        });

        Object.entries(this.input).forEach(([key]) => (this.input[key] = null));
        this.showModal = false;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors'


.events__create
  text-align: center
  border: 1px solid $main
  padding: 1rem
  margin: 2rem auto
  width: 30rem
  max-width: 80%
</style>
