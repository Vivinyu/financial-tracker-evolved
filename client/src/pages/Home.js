import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react"

const Home = () => {
  return (
    <Box textAlign="center" py={10}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">Welcome to Financial Tracker Evolved</Heading>
        <Text fontSize="xl">Take control of your finances with our easy-to-use tracking tools.</Text>
        <Button as={RouterLink} to="/signup" colorScheme="teal" size="lg">
          Get Started
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;