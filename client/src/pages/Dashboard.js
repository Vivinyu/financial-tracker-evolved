import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Text, VStack, Container, SimpleGrid, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";
import { QUERY_ME, QUERY_BUDGET, QUERY_INCOMES, QUERY_EXPENSES } from '../utils/queries';
import BackButton from '../components/BackButton';

const Dashboard = () => {
  const { loading: loadingUser, data: userData } = useQuery(QUERY_ME);
  const { loading: loadingBudget, data: budgetData } = useQuery(QUERY_BUDGET);
  const { loading: loadingIncomes, data: incomesData } = useQuery(QUERY_INCOMES);
  const { loading: loadingExpenses, data: expensesData } = useQuery(QUERY_EXPENSES);

  const user = userData?.me || {};
  const budget = budgetData?.budget?.amount || 0;
  const totalIncome = incomesData?.incomes.reduce((acc, income) => acc + income.amount, 0) || 0;
  const totalExpenses = expensesData?.expenses.reduce((acc, expense) => acc + expense.amount, 0) || 0;

  if (loadingUser || loadingBudget || loadingIncomes || loadingExpenses) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} align="stretch" width="100%">
        <BackButton />
        <Heading as="h2" size="xl" textAlign="center" marginTop="100px" backgroundColor="green" color="white" h="100px" display="flex"
          alignItems="center"
          justifyContent="center">Welcome, {user.username}!</Heading>
        <Text fontSize="lg" textAlign="center" as="b" marginBottom="30px" marginTop="30px">Here's your financial overview:</Text>
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <SimpleGrid columns={[1, null, 2]} spacing={15}>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg='green' height="100px" width="120px" color="white">
              <StatGroup textAlign="center">
                <Stat as="b">
                  <StatLabel>Budget</StatLabel>
                  <StatNumber marginTop="20px" marginLeft="0px">${budget.toFixed(2)}</StatNumber>
                </Stat>
              </StatGroup>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg='green' height="100px" width="120px" color="white">
             <StatGroup textAlign="center">
                <Stat as="b">
                  <StatLabel>Total Income</StatLabel>
                  <StatNumber marginTop="20px" marginLeft="0px">${totalIncome.toFixed(2)}</StatNumber>
                </Stat>
              </StatGroup>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg='green' height="100px" width="120px" color="white">
              <StatGroup textAlign="center">
                <Stat as="b">
                  <StatLabel>Total Expenses</StatLabel>
                  <StatNumber marginTop="20px" marginLeft="0px">${totalExpenses.toFixed(2)}</StatNumber>
                </Stat>
              </StatGroup>
            </Box>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg='green' height="100px" width="120px" color="white">
              <StatGroup textAlign="center">
                <Stat as="b">
                  <StatLabel>Balance</StatLabel>
                  <StatNumber marginTop="20px" marginLeft="0px">${(totalIncome - totalExpenses).toFixed(2)}</StatNumber>
               </Stat>
              </StatGroup>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container >
  );
};

export default Dashboard;