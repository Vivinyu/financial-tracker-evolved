import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack, Container, } from "@chakra-ui/react";

const Home = () => {
  return (
      <Box
        backgroundColor="#EAE8E1"
        width="100%"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="container.lg">
          <VStack spacing={10} align="center" textAlign="center">
            <Heading as="h1" size="2xl" color="black">
              Money Is Also Man's Best Friend
            </Heading>
            <Text fontSize="xl" color="black">
              Take control of your finances with our easy-to-use tracking tools. 
              Monitor your income, expenses, and budget all in one place.
            </Text>
            <Button 
              as={RouterLink} 
              to="/signup" 
              colorScheme="teal" 
              size="lg"
              _hover={{ bg: "teal.500" }}
              width="10%" 
              color="green" 
              variant="solid" 
              marginBottom="30px"
            >
              Get Started
            </Button>
            <Box 
              bg="rgba(255, 255, 255, 0.1)" 
              p={6} 
              borderRadius="md" 
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
            >
              <VStack spacing={4} align="start">
                <Heading as="h3" size="lg" color="black" marginLeft="75px">Features</Heading>
                <Text color="black">✅ Track Income and Expenses</Text>
                <Text color="black">✅ Set and Monitor Budgets</Text>
                <Text color="black">✅ Visualize Financial Data</Text>
                <Text color="black">✅ Secure and Easy to Use</Text>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
  );
};

export default Home;