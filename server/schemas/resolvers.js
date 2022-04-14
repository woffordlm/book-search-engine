// const { AuthenticationError } = require("apollo-server-errors");
const { User } = require("../models");

const resolvers = {
  Query: {
    me: () => {
      return User.find()
    }
  }
};

module.exports = resolvers;