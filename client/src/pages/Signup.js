import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, Container, useToast } from "@chakra-ui/react";
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  const toast = useToast();
  const navigate = useNavigate();

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
      navigate('/dashboard');
    } catch (e) {
      console.error('Signup error:', e);
      toast({
        title: "Signup Error",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
    <Container maxW="container.sm" centerContent>
      <VStack spacing={4} align="stretch" width="100%">
        <BackButton />
        <Heading as="h2" size="xl" textAlign="center">Sign Up</Heading>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <Input
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
            <Input
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Input
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button type="submit" colorScheme="teal" width="100%">Sign Up</Button>
          </VStack>
        </form>
        {error && <Text color="red.500" textAlign="center">Signup failed</Text>}
        <Text textAlign="center">
          Already have an account? {' '}
          <RouterLink to="/login" style={{ color: 'teal' }}>
            Login here
          </RouterLink>
        </Text>
      </VStack>
    </Container>
  );
};

export default Signup;