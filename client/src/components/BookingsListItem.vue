<template>
  <li class="bookings__list-item">
    <div>
      <h1>{{ title }}</h1>
      <h2 v-if="displayDetails">{{ createdAtFormatted }}</h2>
    </div>

    <div v-if="displayDetails">
      <button class="btn" @click="cancelBooking(_id)">Cancel</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    _id: String,
    displayDetails: Boolean,
    createdAt: String,
    title: String,
    date: String,
    cancelBooking: Function,
  },

  computed: {
    createdAtFormatted() {
      return new Date(this.createdAt).toLocaleDateString();
    },
  },
};
</script>

<style lang="sass">
@import '../sass/mixins';

.bookings__list-item
  @include base-list-item
</style>