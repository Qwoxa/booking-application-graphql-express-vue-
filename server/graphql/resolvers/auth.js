const User = require('../../models/user');

module.exports = {
  createUser: async ({ userInput }) => {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) throw new Error('User already exists');

    // bcrypt is handled by mognodb triggers
    return new User(userInput).save();
  },
};
