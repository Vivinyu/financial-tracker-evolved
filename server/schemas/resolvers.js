const { AuthenticationError } = require('apollo-server-express');
// const { User, Budget, Income, Expense } = require('../models');
const { User, Budget, Income, Expense } = require(path.join(__dirname, '..', 'models'));
const { signToken } = require('../utils/auth');
const path = require('path');
const fs = require('fs');

console.log('Current directory:', __dirname);
console.log('Parent directory contents:', fs.readdirSync(path.join(__dirname, '..')));



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
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Server-side addUser error:', error);
        if (error.code === 11000) {
          if (error.keyPattern.username) {
            throw new AuthenticationError('Username already exists');
          } else if (error.keyPattern.email) {
            throw new AuthenticationError('Email already exists');
          }
        }
        throw new AuthenticationError('Could not create user: ' + error.message);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Server-side login error:', error);
        throw new AuthenticationError('Login failed: ' + error.message);
      }
    },
    addBudget: async (parent, { amount }, context) => {
      if (context.user) {
        try {
          const budget = await Budget.findOneAndUpdate(
            { user: context.user._id },
            { amount },
            { new: true, upsert: true }
          );
          return budget;
        } catch (error) {
          console.error('Server-side addBudget error:', error);
          throw new Error('Failed to add or update budget: ' + error.message);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addIncome: async (parent, { source, amount }, context) => {
      if (context.user) {
        try {
          const income = await Income.create({
            source,
            amount,
            user: context.user._id,
          });
          return income;
        } catch (error) {
          console.error('Server-side addIncome error:', error);
          throw new Error('Failed to add income: ' + error.message);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addExpense: async (parent, { description, amount, category }, context) => {
      if (context.user) {
        try {
          const expense = await Expense.create({
            description,
            amount,
            category,
            user: context.user._id,
          });
          return expense;
        } catch (error) {
          console.error('Server-side addExpense error:', error);
          throw new Error('Failed to add expense: ' + error.message);
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;