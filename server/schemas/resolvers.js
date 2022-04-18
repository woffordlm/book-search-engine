const { AuthenticationError } = require("apollo-server-errors");
const { User, Book } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
  },
Mutation: {
  login: async (parent, { email, password }) => {
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      throw new AuthenticationError("Your login info does not seem to match");
    }

    const correctPassword = await loginUser.isCorrectPassword(password);
    if (!correctPassword) {
      throw new AuthenticationError("Invalid credentials");
    }
    const token = signToken(loginUser);

    return {  token, loginUser };
  },
  addUser: async (parent, args) => {
    const user = await User.create(args);
    const token = signToken(user);

    return { token, user };
  },
  saveBook: async (parent, { input }, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
  removeBook: async (parent, { bookId }, context) => {
    if (context.user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return updatedUser;
    }
    throw new AuthenticationError("You need to be logged in!");
  },
},

};

module.exports = resolvers;