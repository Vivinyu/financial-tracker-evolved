import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, Container, useToast, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { ADD_INCOME } from '../utils/mutations';
import { QUERY_INCOMES } from '../utils/queries';
import BackButton from '../components/BackButton';

const Income = () => {
  const [incomeData, setIncomeData] = useState({ source: '', amount: '' });
  const { loading, data, refetch } = useQuery(QUERY_INCOMES);
  const [addIncome] = useMutation(ADD_INCOME);
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addIncome({
        variables: { ...incomeData, amount: parseFloat(incomeData.amount) },
      });
      setIncomeData({ source: '', amount: '' });
      refetch();
      toast({
        title: "Income added.",
        description: "Your income has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to add income. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} align="stretch" width="100%">
        <BackButton />
        <Heading as="h2" size="xl" textAlign="center">Income</Heading>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <Input 
              name="source"
              placeholder="Income source" 
              value={incomeData.source}
              onChange={handleChange}
            />
            <Input 
              name="amount"
              type="number" 
              placeholder="Amount" 
              value={incomeData.amount}
              onChange={handleChange}
            />
            <Button colorScheme="teal" type="submit" width="100%">Add Income</Button>
          </VStack>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Source</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.incomes.map((income) => (
                  <Tr key={income._id}>
                    <Td>{income.source}</Td>
                    <Td isNumeric>${income.amount.toFixed(2)}</Td>
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

export default Income;