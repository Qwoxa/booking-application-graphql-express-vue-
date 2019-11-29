<template>
  <li class="bookings__list-item">
    <div>
      <h1>{{ title }}</h1>
      <h2 v-if="displayDetails">{{ createdAtFormatted }}</h2>
    </div>

    <div>
      <button v-if="isMine" class="btn" @click="cancelBooking(_id)">Cancel</button>
      <!-- <p v-else>{{ whoBooked }}</p> TODO -->
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
    isMine: Boolean,
    cancelBooking: Function,
    whoBooked: String,
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