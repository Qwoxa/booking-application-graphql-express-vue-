const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async ({ userInput }) => {
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) throw new Error('User already exists');

    // bcrypt is handled by mognodb triggers
    return new User(userInput).save();
  },
  login: async ({ email, password }) => {
    const user = await User.find({ email });
    if (!user.length) throw new Error('Access denied');

    const isEqual = await bcrypt.compare(password, user[0].password);
    if (!isEqual) throw new Error('Access denied');

    const payload = { userId: user[0].id, email };
    const options = { expiresIn: '1h' };
    const token = await jwt.sign(payload, process.env.JWT, options);

    return {
      userId: payload.userId,
      tokenExpiration: 1,
      token,
    };
  },
};
