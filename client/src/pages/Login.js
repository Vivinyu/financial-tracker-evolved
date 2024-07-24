import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack } from "@chakra-ui/react"
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

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
        <Heading as="h2" size="xl">Login</Heading>
        <form onSubmit={handleFormSubmit}>
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
        {error && <Text color="red.500">The provided credentials are incorrect</Text>}
      </VStack>
    </Box>
  );
};

export default Login;