const User = require('../../models/user');
const Event = require('../../models/event');
const Booking = require('../../models/booking');

const { toISOString } = require('../../helpers');

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
 * Transforms the booking for the output
 * @param {Booking} booking
 */
const transformBooking = booking => ({
  ...booking._doc,
  createdAt: toISOString(booking._doc.createdAt),
  updatedAt: toISOString(booking._doc.updatedAt),
  user: user.bind(this, booking._doc.user),
  event: singleEvent.bind(this, booking._doc.event),
});

/**
 * Transforms the event for the output
 * @param {Event} event
 */
const transformEvent = event => ({
  ...event._doc,
  date: toISOString(event._doc.date),
  creator: user.bind(this, event._doc.creator),
});

module.exports = {
  transformBooking,
  transformEvent,
};
