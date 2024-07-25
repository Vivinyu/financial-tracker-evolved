import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Heading, Input, Button, Text, VStack, Container, useToast } from "@chakra-ui/react";
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import BackButton from '../components/BackButton';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      navigate('/dashboard');
    } catch (e) {
      console.log(e);
      toast({
        title: "Login Error",
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
        <Heading as="h2" size="xl" textAlign="center">Login</Heading>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
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
            <Button type="submit" colorScheme="teal" width="100%">Login</Button>
          </VStack>
        </form>
        {error && <Text color="red.500" textAlign="center">The provided credentials are incorrect</Text>}
        <Text textAlign="center">
          Don't have an account? {' '}
          <RouterLink to="/signup" style={{ color: 'teal' }}>
            Sign up here
          </RouterLink>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login;