import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BUDGET = gql`
  mutation addBudget($amount: Float!) {
    addBudget(amount: $amount) {
      _id
      amount
    }
  }
`;

export const ADD_INCOME = gql`
  mutation addIncome($source: String!, $amount: Float!) {
    addIncome(source: $source, amount: $amount) {
      _id
      source
      amount
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation addExpense($description: String!, $amount: Float!, $category: String!) {
    addExpense(description: $description, amount: $amount, category: $category) {
      _id
      description
      amount
      category
    }
  }
`;