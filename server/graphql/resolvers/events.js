const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    const events = await Event.find({});

    return events.map(event => transformEvent(event));
  },
  createEvent: async ({ eventInput }) => {
    const event = await new Event({
      ...eventInput,
      creator: '5ddd483d4e479d6f11e7a7dc', //! CHANGE ID
    }).save();

    const foundUser = await User.findById('5ddd483d4e479d6f11e7a7dc'); //! CHANGE ID
    foundUser.createdEvents.push(event);
    await foundUser.save();

    // add creator, so we can populate the result
    return transformEvent(event);
  },
};
