<template>
  <li class="events__list-item">
    <div>
      <h1>{{ title }}</h1>
      <h2 v-if="price">${{ price }} - {{ localDate }}</h2>
    </div>

    <div v-if="displayDetails" class="events__list-item__details">
      <button v-if="!isCreator" class="btn" @click="onShowDetails(_id)">View</button>
      <p v-else>Mine</p>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    'title',
    'price',
    'description',
    'isCreator',
    'displayDetails',
    '_id',
    'date',
    'creator',
    '__typename',
    'onShowDetails',
  ],
  computed: {
    localDate() {
      return new Date(this.date).toLocaleDateString();
    },
  },
};
</script>

<style lang="sass">
@import '../sass/colors';
@import '../sass/mixins';

.events__list-item
  @include base-list-item


.events__list-item__details
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center

  p
    color: #000;
    cursor: default
    background-color: lighten($main, 35)
    border: 1px solid $main
    border-radius: 3px
    padding: .25rem 1rem
    margin: 0 1rem
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .26)
</style>
