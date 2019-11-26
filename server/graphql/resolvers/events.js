const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');

module.exports = {
  events: async () => {
    const events = await Event.find({});

    return events.map(event => transformEvent(event));
  },
  createEvent: async ({ eventInput }, req) => {
    console.log(req.userId);
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const event = await new Event({
      ...eventInput,
      creator: req.userId,
    }).save();

    const foundUser = await User.findById(req.userId);
    foundUser.createdEvents.push(event);
    await foundUser.save();

    // add creator, so we can populate the result
    return transformEvent(event);
  },
};
