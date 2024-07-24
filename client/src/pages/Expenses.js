import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, HStack } from "@chakra-ui/react"
import { ADD_EXPENSE } from '../utils/mutations';
import { QUERY_EXPENSES } from '../utils/queries';

const Expenses = () => {
  const [expenseData, setExpenseData] = useState({ description: '', amount: '', category: '' });
  const { loading, data } = useQuery(QUERY_EXPENSES);
  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [{ query: QUERY_EXPENSES }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addExpense({
        variables: { ...expenseData, amount: parseFloat(expenseData.amount) },
      });
      setExpenseData({ description: '', amount: '', category: '' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">Expenses</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input 
            name="description"
            placeholder="Expense description" 
            value={expenseData.description}
            onChange={handleChange}
            mb={2}
          />
          <Input 
            name="amount"
            type="number" 
            placeholder="Amount" 
            value={expenseData.amount}
            onChange={handleChange}
            mb={2}
          />
          <Input 
            name="category"
            placeholder="Category" 
            value={expenseData.category}
            onChange={handleChange}
            mb={2}
          />
          <Button colorScheme="teal" type="submit">Add Expense</Button>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <VStack align="stretch">
            <Heading as="h3" size="lg">Expense List</Heading>
            {data?.expenses.map((expense) => (
              <HStack key={expense._id} justify="space-between">
                <Text>{expense.description}</Text>
                <Text>${expense.amount}</Text>
                <Text>{expense.category}</Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Expenses;