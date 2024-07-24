import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import { QUERY_ME } from '../utils/queries';

const Dashboard = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">Welcome, {user.username}!</Heading>
        <Text fontSize="lg">This is your financial dashboard. Here you can view your budget, income, and expenses.</Text>
        {/* Add more dashboard content here */}
      </VStack>
    </Box>
  );
};

export default Dashboard;