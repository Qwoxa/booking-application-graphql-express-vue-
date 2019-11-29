const DataLoader = require('dataloader');
const User = require('../../models/user');
const Event = require('../../models/event');
const Booking = require('../../models/booking');

const eventLoader = new DataLoader(eventIds => {
  return events(eventIds);
});

const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } }).select('-password');
});

const { toISOString } = require('../../helpers');

/**
 * Gets events with creator field as a function
 * @param {Array<String>} eventIds
 * @returns {Array<Event>}
 */
const events = async eventIds => {
  const events = await Event.find({ _id: { $in: eventIds } });
  const sortedEvents = events.sort((a, b) => {
    return eventIds.indexOf(a._id.toString) - eventIds.indexOf(b._id.toString);
  });

  return sortedEvents.map(event => ({
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
  const user = await userLoader.load(userId.toString());
  //User.findById(userId);
  return {
    ...user._doc,
    createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
  };
};

/**
 * Gets event with creator field as a function
 * @param {String} eventId
 */
const singleEvent = async eventId => {
  const event = await eventLoader.load(eventId.toString());

  return event;
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
