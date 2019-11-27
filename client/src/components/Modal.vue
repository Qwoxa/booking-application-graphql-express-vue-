<template>
  <div class="modal">
    <header>
      {{ title }}
    </header>
    <section class="modal__content">
      <slot name="content"></slot>
    </section>
    <section class="modal__actions">
      <button class="btn" v-if="cancelable">Cancel</button>
      <button class="btn" v-if="confirmable">Confirm</button>
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
  },
};
</script>

<style lang="sass">
.modal
  width: 90%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .26);
  position: fixed;
  top: 20vh;
  left: 5%;

@media (min-width: 768px)
  .modal
    width: 50rem;
    left: calc((100% - 50rem) / 2);
</style>
