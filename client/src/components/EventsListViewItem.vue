<template>
  <Modal
    class="view-event__modal"
    v-if="showModal"
    title="View Event"
    :onCancel="hideModal"
    confirmTitle="Book Event"
  >
    <template #content>
      <h1>{{ title }}</h1>
      <h2>
        ${{ price }} -
        {{ new Date(date).toLocaleDateString() }}
      </h2>
      <p>{{ description }}</p>
    </template>
  </Modal>
</template>

<script>
import Modal from './BaseModal';

export default {
  props: ['date', 'title', 'price', 'description', 'showModal', 'hideModal'],
  components: {
    Modal,
  },
};
</script>

<style lang="sass">
.view-event__modal
  h1
    margin: 0
    font-size: 1.5rem

  h2
    margin: 0
    font-size: 1rem
    color: #777
</style>
