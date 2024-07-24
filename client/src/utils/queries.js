import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_BUDGET = gql`
  query getBudget {
    budget {
      _id
      amount
    }
  }
`;

export const QUERY_INCOMES = gql`
  query getIncomes {
    incomes {
      _id
      source
      amount
    }
  }
`;

export const QUERY_EXPENSES = gql`
  query getExpenses {
    expenses {
      _id
      description
      amount
      category
    }
  }
`;