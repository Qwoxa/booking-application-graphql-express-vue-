const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');
/**
 * Gets events with creator field as a function
 * @param {Array<String>} eventIds
 * @returns {Array<Event>}
 */
const events = async eventIds => {
  const events = await Event.find({ _id: { $in: eventIds } });

  return events.map(event => ({
    ...event._doc,
    creator: user.bind(this, event._doc.creator),
  }));
};

/**
 * Gets the user data withour password and with createdEvents field as a function
 * @param {String} userId
 * @returns {User}
 */
const user = async userId => {
  const user = await User.findById(userId).select('-password');
  return {
    ...user._doc,
    createdEvents: events.bind(this, user._doc.createdEvents),
  };
};

/**
 * Gets event with creator field as a function
 * @param {String} eventId
 */
const singleEvent = async eventId => {
  const event = await Event.findById(eventId);

  return {
    ...event._doc,
    creator: user.bind(this, event._doc.creator),
  };
};

/**
 * Converts the int date to ISO String date
 * @param {Number} intDate
 * @returns {String}
 */
const toISOString = intDate => new Date(intDate).toISOString();

module.exports = {
  bookings: async () => {
    const bookings = await Booking.find({});

    // populate user and event & convert dates to ISO
    return bookings.map(b => ({
      ...b._doc,
      createdAt: toISOString(b._doc.createdAt),
      updatedAt: toISOString(b._doc.updatedAt),
      user: user.bind(this, b._doc.user),
      event: singleEvent.bind(this, b._doc.event),
    }));
  },
  events: async () => {
    const events = await Event.find({});

    return events.map(event => ({
      ...event._doc,
      date: toISOString(event._doc.date),
      creator: user.bind(this, event._doc.creator),
    }));
  },
  createEvent: async ({ eventInput }) => {
    // create event in db
    const event = await new Event({
      ...eventInput,
      creator: '5ddd483d4e479d6f11e7a7dc', //! CHANGE ID
    }).save();

    // add event to the user doc
    const foundUser = await User.findById('5ddd483d4e479d6f11e7a7dc'); //! CHANGE ID
    foundUser.createdEvents.push(event);
    await foundUser.save();

    // add creator, so we can populate the result
    return {
      ...event._doc,
      date: toISOString(event._doc.date),
      creator: user.bind(this, event._doc.creator),
    };
  },
  createUser: async ({ userInput }) => {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) throw new Error('User already exists');

    // bcrypt is handled by mognodb triggers
    return new User(userInput).save();
  },
  bookEvent: async ({ eventId }) => {
    const booking = await new Booking({
      user: '5ddd483d4e479d6f11e7a7dc', //! CHANGE IT
      event: eventId,
    }).save();

    // populate user and event & convert dates to ISO
    return {
      ...booking._doc,
      createdAt: toISOString(booking._doc.createdAt),
      updatedAt: toISOString(booking._doc.updatedAt),
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
    };
  },
  cancelBooking: async ({ bookingId }) => {
    const booking = await Booking.findById(bookingId).populate('event');

    await Booking.deleteOne({ _id: bookingId });

    return {
      ...booking.event._doc,
      creator: user.bind(this, booking.event.creator),
    };
  },
};
