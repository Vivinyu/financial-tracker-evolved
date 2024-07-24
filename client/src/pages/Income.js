import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, HStack } from "@chakra-ui/react"
import { ADD_INCOME } from '../utils/mutations';
import { QUERY_INCOMES } from '../utils/queries';

const Income = () => {
  const [incomeData, setIncomeData] = useState({ source: '', amount: '' });
  const { loading, data } = useQuery(QUERY_INCOMES);
  const [addIncome] = useMutation(ADD_INCOME, {
    refetchQueries: [{ query: QUERY_INCOMES }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addIncome({
        variables: { ...incomeData, amount: parseFloat(incomeData.amount) },
      });
      setIncomeData({ source: '', amount: '' });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">Income</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input 
            name="source"
            placeholder="Income source" 
            value={incomeData.source}
            onChange={handleChange}
            mb={2}
          />
          <Input 
            name="amount"
            type="number" 
            placeholder="Amount" 
            value={incomeData.amount}
            onChange={handleChange}
            mb={2}
          />
          <Button colorScheme="teal" type="submit">Add Income</Button>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <VStack align="stretch">
            <Heading as="h3" size="lg">Income List</Heading>
            {data?.incomes.map((income) => (
              <HStack key={income._id} justify="space-between">
                <Text>{income.source}</Text>
                <Text>${income.amount}</Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Income;