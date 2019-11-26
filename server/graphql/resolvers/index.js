const Event = require('../../models/event');
const User = require('../../models/user');

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
 * Converts the int date to ISO String date
 * @param {Number} intDate
 * @returns {String}
 */
const toISOString = intDate => new Date(intDate).toISOString();

module.exports = {
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
};
