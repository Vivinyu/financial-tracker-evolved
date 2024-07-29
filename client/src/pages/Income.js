import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, Container, useToast, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Stack } from "@chakra-ui/react";

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
        <Stack>
          <Heading as="h2" size="xl" fontSize="40px" textAlign="center" color="green" marginBottom="30px" marginTop="100px">Income</Heading>
        </Stack>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <Input
              name="source"
              placeholder="Income source"
              value={incomeData.source}
              onChange={handleChange}
              padding="10px"
              marginBottom="5px"
            />

            <Input
              name="amount"
              type="number"
              placeholder="Amount"
              value={incomeData.amount}
              onChange={handleChange}
              padding="10px"
              marginBottom="30px"
            />
            <Button colorScheme="teal" type="submit" width="12%" backgroundColor="white" color="green" variant="solid" marginBottom="20px">Add Income</Button>
          </VStack>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box bg='green' h='300px' color='white' p={4} display="flex" alignItems="center" justifyContent="center">
            <TableContainer>
              <Box overflowX="auto">
                <Table variant="simple" color="white">
                  <Text as="caption" mb={2} textAlign="center" color="white" fontSize='30px' fontWeight="bold" marginBottom="20px">Income History</Text>
                  <Thead>
                    <Tr>
                      <Th p={4} textAlign="center">Source</Th>
                      <Th p={4} textAlign="center" isNumeric>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data?.incomes.map((income) => (
                      <Tr key={income._id}>
                        <Td p={4} textAlign="center">{income.source}</Td>
                        <Td p={4} textAlign="center" isNumeric>${income.amount.toFixed(2)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TableContainer>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Income;