import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, Container, useToast, Table, Thead, Tbody, Tr, Th, Td, Stack, TableContainer, TableCaption, Center} from "@chakra-ui/react";
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
        <Stack>
          <Heading as="h2" size="xl" fontSize="40px" textAlign="center" color="green" marginBottom="30px" marginTop="100px">Expenses</Heading>
        </Stack>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <Input
              name="description"
              placeholder="Expense description"
              value={expenseData.description}
              onChange={handleChange}
              padding="10px"
              marginBottom="5px"
            />
            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={expenseData.amount}
              onChange={handleChange}
              padding="10px"
              marginBottom="5px"
            />
            <Input
              name="category"
              placeholder="Category"
              value={expenseData.category}
              onChange={handleChange}
              padding="10px"
              marginBottom="20px"
            />
            <Button colorScheme="teal" type="submit" width="12%" backgroundColor="white" color="green" variant="solid" marginBottom="20px">Add Expense</Button>
          </VStack>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box bg='green' h='300px' color='white' p={4} display="flex" alignItems="center" justifyContent="center">
            <TableContainer>
              <Table variant="simple" maxWidth="100%">
              <Text as="caption" mb={2} textAlign="center" color="white" fontSize='30px' fontWeight="bold" marginBottom="20px">Expense History</Text>
                <Thead>
                  <Tr>
                    <Th p={4} textAlign="center">Description</Th>
                    <Th p={4} textAlign="center">Category</Th>
                    <Th p={4} textAlign="center" isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.expenses.map((expense) => (
                    <Tr key={expense._id}>
                      <Td p={4} textAlign="center">{expense.description}</Td>
                      <Td p={4} textAlign="center">{expense.category}</Td>
                      <Td p={4} textAlign="center" isNumeric>${expense.amount.toFixed(2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Expenses;