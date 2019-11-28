<template>
  <li class="events__list-item">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors';

.events__list-item
  margin: 1rem 0
  padding: 1rem
  border: 1px solid $main
</style>