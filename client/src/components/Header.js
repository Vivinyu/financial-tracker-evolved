import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button } from "@chakra-ui/react"
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'}>
          <Link to="/">Financial Tracker Evolved</Link>
        </Heading>
        <Flex alignItems={'center'}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/dashboard"><Button colorScheme="teal" variant="ghost" mr={3}>Dashboard</Button></Link>
              <Link to="/budget"><Button colorScheme="teal" variant="ghost" mr={3}>Budget</Button></Link>
              <Link to="/income"><Button colorScheme="teal" variant="ghost" mr={3}>Income</Button></Link>
              <Link to="/expenses"><Button colorScheme="teal" variant="ghost" mr={3}>Expenses</Button></Link>
              <Button colorScheme="teal" variant="ghost" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button colorScheme="teal" variant="ghost" mr={3}>Login</Button></Link>
              <Link to="/signup"><Button colorScheme="teal" variant="ghost">Signup</Button></Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;