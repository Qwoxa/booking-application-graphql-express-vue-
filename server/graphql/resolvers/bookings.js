const Booking = require('../../models/booking');

const { transformBooking, transformEvent } = require('./merge');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const bookings = await Booking.find({});
    return bookings.map(b => transformBooking(b));
  },
  bookEvent: async ({ eventId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const booking = await new Booking({
      user: req.userId,
      event: eventId,
    }).save();

    return transformBooking(booking);
  },
  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    // TODO if the user who created === req.user

    const booking = await Booking.findById(bookingId).populate('event');

    await Booking.deleteOne({ _id: bookingId });
    return transformEvent(booking.event);
  },
};
