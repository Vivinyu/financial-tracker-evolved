import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, Container, useToast, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ADD_EXPENSE } from '../utils/mutations';
import { QUERY_EXPENSES } from '../utils/queries';
import BackButton from '../components/BackButton';

const Expenses = () => {
  const [expenseData, setExpenseData] = useState({ description: '', amount: '', category: '' });
  const { loading, data, refetch } = useQuery(QUERY_EXPENSES);
  const [addExpense] = useMutation(ADD_EXPENSE);
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addExpense({
        variables: { ...expenseData, amount: parseFloat(expenseData.amount) },
      });
      setExpenseData({ description: '', amount: '', category: '' });
      refetch();
      toast({
        title: "Expense added.",
        description: "Your expense has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} align="stretch" width="100%">
        <BackButton />
        <Heading as="h2" size="xl" textAlign="center">Expenses</Heading>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <Input 
              name="description"
              placeholder="Expense description" 
              value={expenseData.description}
              onChange={handleChange}
            />
            <Input 
              name="amount"
              type="number" 
              placeholder="Amount" 
              value={expenseData.amount}
              onChange={handleChange}
            />
            <Input 
              name="category"
              placeholder="Category" 
              value={expenseData.category}
              onChange={handleChange}
            />
            <Button colorScheme="teal" type="submit" width="100%">Add Expense</Button>
          </VStack>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Description</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.expenses.map((expense) => (
                  <Tr key={expense._id}>
                    <Td>{expense.description}</Td>
                    <Td>{expense.category}</Td>
                    <Td isNumeric>${expense.amount.toFixed(2)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Expenses;