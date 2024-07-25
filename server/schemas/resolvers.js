const { AuthenticationError } = require('apollo-server-express');
const { User, Budget, Income, Expense } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    budget: async (parent, args, context) => {
      if (context.user) {
        return Budget.findOne({ user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    incomes: async (parent, args, context) => {
      if (context.user) {
        return Income.find({ user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    expenses: async (parent, args, context) => {
      if (context.user) {
        return Expense.find({ user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // Mutation: {
  //   addUser: async (parent, { username, email, password }) => {
  //     const user = await User.create({ username, email, password });
  //     const token = signToken(user);
  //     return { token, user };
//   Mutation: {
//     addUser: async (parent, args) => {
//       try {
//         const user = await User.create(args);
//         const token = signToken(user);
//         return { token, user };
//       } catch (error) {
//         console.error('Server-side addUser error:', error);
//         throw new AuthenticationError('Could not create user');
//     },
//     login: async (parent, { email, password }) => {
//       const user = await User.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('No user found with this email address');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect credentials');
//       }

//       const token = signToken(user);

//       return { token, user };
//     },
//     addBudget: async (parent, { amount }, context) => {
//       if (context.user) {
//         const budget = await Budget.findOneAndUpdate(
//           { user: context.user._id },
//           { amount },
//           { new: true, upsert: true }
//         );
//         return budget;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     addIncome: async (parent, { source, amount }, context) => {
//       if (context.user) {
//         const income = await Income.create({
//           source,
//           amount,
//           user: context.user._id,
//         });
//         return income;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     addExpense: async (parent, { description, amount, category }, context) => {
//       if (context.user) {
//         const expense = await Expense.create({
//           description,
//           amount,
//           category,
//           user: context.user._id,
//         });
//         return expense;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//   },
// };

// module.exports = resolvers;

Mutation: {
  addUser: async (parent, args) => {
    try {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    } catch (error) {
      console.log('Attempting to create user with args:', args);
      const user = await User.create(args);
      console.log('User created:', user);
      const token = signToken(user);
      return { token, user };
    } 
      console.error('Server-side addUser error:', error);
      if (error.code === 11000) {
        throw new AuthenticationError('Email or username already exists');
      
      throw new AuthenticationError('Could not create user: ' + error.message);
    }
  }, // Added missing closing bracket for the addUser function
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('No user found with this email address');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect credentials');
    }

    // Assuming the signToken function exists and works correctly
    const token = signToken(user);
    return { token, user }; // Return the token and user upon successful login
  }
}}
module.exports = resolvers;