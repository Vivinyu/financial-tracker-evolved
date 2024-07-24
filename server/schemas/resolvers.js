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
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBudget: async (parent, { amount }, context) => {
      if (context.user) {
        const budget = await Budget.findOneAndUpdate(
          { user: context.user._id },
          { amount },
          { new: true, upsert: true }
        );
        return budget;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addIncome: async (parent, { source, amount }, context) => {
      if (context.user) {
        const income = await Income.create({
          source,
          amount,
          user: context.user._id,
        });
        return income;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addExpense: async (parent, { description, amount, category }, context) => {
      if (context.user) {
        const expense = await Expense.create({
          description,
          amount,
          category,
          user: context.user._id,
        });
        return expense;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;