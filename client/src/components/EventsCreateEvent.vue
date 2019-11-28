<template>
  <section>
    <p>Share you own Events!</p>
    <button class="btn" @click="showModal = true">Create Event</button>

    <div v-show="showModal">
      <Backdrop />
      <Modal title="Create New Event" :onCancel="onModalCancel" :onConfirm="onModalConfirm">
        <template #content>
          <EventsForm :input="input" :error="error" />
        </template>
      </Modal>
    </div>
  </section>
</template>

<script>
import Modal from './BaseModal';
import Backdrop from './BaseBackdrop';
import EventsForm from './EventsForm';
import { CREATE_EVENT } from '../graphql/queries';

export default {
  components: {
    Backdrop,
    Modal,
    EventsForm,
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
          // TODO update cache
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
