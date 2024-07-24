import React from 'react';
import { Box, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Box as="footer" mt="auto" py={4} bg="teal.500">
      <Text textAlign="center" color="white">
        © 2023 Financial Tracker Evolved. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;