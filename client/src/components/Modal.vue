<template>
  <div class="modal">
    <header class="modal__header">
      <h1>{{ title }}</h1>
    </header>
    <section class="modal__content">
      <slot name="content"></slot>
    </section>
    <section class="modal__actions">
      <button class="btn" v-if="cancelable" @click="onCancel">Cancel</button>
      <button class="btn" v-if="confirmable" @click="onConfirm">Confirm</button>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    cancelable: {
      type: Boolean,
      default: true,
    },
    confirmable: {
      type: Boolean,
      default: true,
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.modal
  width: 90%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .26);
  position: fixed;
  top: 20vh;
  left: 5%;
  color: $text;

.modal__header
  padding: 1rem;
  background-color: $main;

  h1
    margin: 0;
    font-size: 1.25rem;

.modal__content
  padding: 1rem;

.modal__actions
  padding-bottom: 1rem;
  display: flex;
  justify-content: center;

@media (min-width: 768px)
  .modal
    width: 30rem;
    left: calc((100% - 30rem) / 2);
</style>
