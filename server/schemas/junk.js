// Query: {
//   me: async (parent, args, context) => {
//     if (context.user) {
//       const userData = await User.findOne({ _id: context.user._id }).select(
//         "-__v -password"
//       );
//       return userData;
//     }
//     throw new AuthenticationError("Not logged in");
//   },
// },
// Mutation: {
//   login: async (parent, { email, password }) => {
//     const user = await User.findOne({ email });

//     if (!user) {
//       throw new AuthenticationError("Invalid credentials");
//     }

//     const correctPassword = await user.isCorrectPassword(password);
//     if (!correctPassword) {
//       throw new AuthenticationError("Invalid credentials");
//     }
//     const token = signToken(user);

//     return { token, user };
//   },
//   addUser: async (parent, args) => {
//     const user = await User.create(args);
//     const token = signToken(user);

//     return { token, user };
//   },
//   saveBook: async (parent, { input }, context) => {
//     if (context.user) {
//       const updatedUser = await User.findOneAndUpdate(
//         { _id: context.user._id },
//         { $addToSet: { savedBooks: input } },
//         { new: true, runValidators: true }
//       );
//       return updatedUser;
//     }
//     throw new AuthenticationError("You need to be logged in!");
//   },
//   removeBook: async (parent, { bookId }, context) => {
//     if (context.user) {
//       const updatedUser = await User.findOneAndUpdate(
//         { _id: context.user._id },
//         { $pull: { savedBooks: { bookId: bookId } } },
//         { new: true }
//       );
//       return updatedUser;
//     }
//     throw new AuthenticationError("You need to be logged in!");
//   },
// },


const { gql } = require('apollo-server-express');

// create our typeDefs
// here we are defining every piece of data that the client can expect to work with through a query or mutation

const typeDefs = gql`
type User {
  username: String!
  email: String!
  bookCount: Int
  savedBooks:[Book]
}
type Query {
  users: String
}
`;

// export the typeDefs
module.exports = typeDefs;



// const typeDefs = gql`
// type Book {
//     authors: [String]
//     description: String
//     bookId:String!
//     image: String
//     link; String
//     title: String!
//   }
// type User {
//   username: String!
//   email: String!
//   bookCount: Int
//   savedBooks:[Book]
// }
// type Query {
//   me: User
//   users: [User]
// }
// type Mutation {
//   login(email: String!, password: String!): Auth
//   addUser(username: String!, email: String!, password: String!): Auth
//   saveBook(input: SavedBookInput): User
//   removeBook(bookId: String!): User
// }
// `;
