import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack } from "@chakra-ui/react"
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      console.error('Signup error:', e);
      if (e.message.includes('Username already exists')) {
        setErrorMessage('Username already taken. Please choose a different one.');
      } else if (e.message.includes('Email already exists')) {
        setErrorMessage('An account with this email already exists.');
      } else {
        setErrorMessage('An error occurred during signup. Please try again.');
      }
    }
  };
  
  // In your JSX, display the error message:
  {errorMessage && <Text color="red.500">{errorMessage}</Text>}
  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const mutationResponse = await addUser({
  //       variables: {
  //         username: formState.username,
  //         email: formState.email,
  //         password: formState.password,
  //       },
  //     });
  //     const token = mutationResponse.data.addUser.token;
  //     Auth.login(token);
  //   } catch (e) {
  //     console.error('Signup error:', e);
  //     console.error('Error details:', e.graphQLErrors);
  //     console.error('Network error:', e.networkError);
  //     console.log(e);
  //   }
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Heading as="h2" size="xl">Signup</Heading>
        <form onSubmit={handleFormSubmit}>
          <Input
            placeholder="Your username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            mb={2}
          />
          <Input
            placeholder="******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
            mb={2}
          />
          <Button type="submit" colorScheme="teal">Submit</Button>
        </form>
        {error && <Text color="red.500">Signup failed</Text>}
      </VStack>
    </Box>
  );
};

export default Signup;