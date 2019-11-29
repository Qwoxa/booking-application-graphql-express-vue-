<template>
  <Modal
    v-if="isOpen"
    class="view-event__modal"
    title="View Event"
    confirmTitle="Book Event"
    :onCancel="hideModal"
    :confirmable="isLoggedIn"
    :onConfirm="bookEvent.bind(this, _id)"
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
  props: [
    '_id',
    'creator',
    '__typename',
    'date',
    'title',
    'price',
    'description',
    'isOpen',
    'hideModal',
    'bookEvent',
    'isLoggedIn',
  ],
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
