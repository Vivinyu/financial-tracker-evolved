import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack } from "@chakra-ui/react"
import { ADD_BUDGET } from '../utils/mutations';
import { QUERY_BUDGET } from '../utils/queries';

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState('');
  const { loading, data } = useQuery(QUERY_BUDGET);
  const [addBudget] = useMutation(ADD_BUDGET);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBudget({
        variables: { amount: parseFloat(budgetAmount) },
      });
      setBudgetAmount('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">Budget</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input 
            type="number" 
            placeholder="Enter budget amount" 
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
          <Button mt={2} colorScheme="teal" type="submit">Set Budget</Button>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Text>Current Budget: ${data?.budget?.amount || 0}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Budget;