const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Budget {
    _id: ID
    amount: Float
    user: User
  }

  type Income {
    _id: ID
    source: String
    amount: Float
    user: User
  }

  type Expense {
    _id: ID
    description: String
    amount: Float
    category: String
    user: User
  }

  type Query {
    me: User
    budget: Budget
    incomes: [Income]
    expenses: [Expense]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBudget(amount: Float!): Budget
    addIncome(source: String!, amount: Float!): Income
    addExpense(description: String!, amount: Float!, category: String!): Expense
  }
`;

module.exports = typeDefs;