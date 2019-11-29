<template>
  <section>
    <ul class="bookings__list">
      <!-- Regular -->
      <BookingsListItem
        :displayDetails="true"
        v-for="booking in bookings"
        :key="booking._id"
        :_id="booking._id"
        :title="booking.event.title"
        :whoBooked="booking.user.email"
        :date="booking.event.date"
        :createdAt="booking.createdAt"
        :cancelBooking="cancelBooking"
        :isMine="booking.user._id === localUser.userId"
      />
      <!-- No entries -->
      <BookingsListItem
        :displayDetails="false"
        v-if="bookings.length === 0 && !$apollo.loading"
        title="No items.."
      />
      <!-- Loading -->
      <BookingsListItem v-if="$apollo.loading" :displayDetails="false" title="Loading.." />
    </ul>
  </section>
</template>

<script>
import BookingsListItem from './BookingsListItem';
import {
  GET_ALL_BOOKINGS,
  CANCEL_BOOKING,
  GET_LOCAL_USER,
} from '../graphql/queries';

export default {
  apollo: {
    bookings: {
      query: GET_ALL_BOOKINGS,
    },
    localUser: {
      query: GET_LOCAL_USER,
    },
  },
  data() {
    return {
      bookings: [],
    };
  },
  methods: {
    cancelBooking(id) {
      this.$apollo.mutate({
        mutation: CANCEL_BOOKING,
        variables: {
          bookingId: id,
        },
        update: (cache, { data: { cancelBooking } }) => {
          const data = cache.readQuery({ query: GET_ALL_BOOKINGS });

          data.bookings = data.bookings.filter(
            b => b._id !== cancelBooking._id
          );
          cache.writeQuery({
            query: GET_ALL_BOOKINGS,
            data,
          });
        },
      });
    },
  },
  components: {
    BookingsListItem,
  },
};
</script>


<style lang="sass">
@import '../sass/mixins';

.bookings__list
  @include base-list
</style>