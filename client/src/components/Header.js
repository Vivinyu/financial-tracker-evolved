import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Button, Center } from "@chakra-ui/react"
import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Heading as="h1" size="lg" letterSpacing={'tighter'} marginTop="100px" marginLeft="540px">
          FIDO 2.0
        </Heading>
        <Flex alignItems={'center'}>
          {Auth.loggedIn() ? (
            <>
              <Link to="/dashboard"><Button colorScheme="teal" variant="ghost" color="green" backgroundColor="white" mr={5}>Dashboard</Button></Link>
              <Link to="/budget"><Button colorScheme="teal" variant="ghost" color="green" backgroundColor="white" mr={5}>Budget</Button></Link>
              <Link to="/income"><Button colorScheme="teal" variant="ghost" color="green" backgroundColor="white" mr={5}>Income</Button></Link>
              <Link to="/expenses"><Button colorScheme="teal" variant="ghost" color="green" backgroundColor="white" mr={5}>Expenses</Button></Link>
              <Button colorScheme="teal" color="green" backgroundColor="white" variant="ghost" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button colorScheme="teal" color="green" backgroundColor="white" variant="ghost" mr={3}>Login</Button></Link>
              <Link to="/signup"><Button colorScheme="teal"  color="green" backgroundColor="white" variant="ghost">Signup</Button></Link>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;