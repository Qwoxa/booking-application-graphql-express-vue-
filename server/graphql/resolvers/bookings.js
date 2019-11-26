const Booking = require('../../models/booking');

const { transformBooking, transformEvent } = require('./merge');

module.exports = {
  bookings: async () => {
    const bookings = await Booking.find({});
    return bookings.map(b => transformBooking(b));
  },
  bookEvent: async ({ eventId }) => {
    const booking = await new Booking({
      user: '5ddd483d4e479d6f11e7a7dc', //! CHANGE IT
      event: eventId,
    }).save();

    return transformBooking(booking);
  },
  cancelBooking: async ({ bookingId }) => {
    const booking = await Booking.findById(bookingId).populate('event');

    await Booking.deleteOne({ _id: bookingId });
    return transformEvent(booking.event);
  },
};
