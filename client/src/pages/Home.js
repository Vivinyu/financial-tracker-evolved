// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react"

// const Home = () => {
//   return (
//     <Box textAlign="center" py={10}>
//       <VStack spacing={8}>
//         <Heading as="h1" size="2xl">Welcome to Financial Tracker Evolved</Heading>
//         <Text fontSize="xl">Take control of your finances with our easy-to-use tracking tools.</Text>
//         <Button as={RouterLink} to="/signup" colorScheme="teal" size="lg">
//           Get Started
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// export default Home;


// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { Box, Heading, Text, Button, VStack, Container, Flex } from "@chakra-ui/react";

// const Home = () => {
//   return (
//     <Box
//       backgroundImage="url('https://images.unsplash.com/photo-1556740749-887f6717d7e4')"
//       backgroundSize="cover"
//       backgroundPosition="center"
//       backgroundAttachment="fixed"
//       minHeight="100vh"
//     >
//       <Box
//         backgroundColor="rgba(0, 0, 0, 0.6)"
//         minHeight="100vh"
//         display="flex"
//         alignItems="center"
//       >
//         <Container maxW="container.xl">
//           <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between">
//             <VStack spacing={6} align="start" maxW="600px">
//               <Heading as="h1" size="2xl" color="white">
//                 Welcome to Financial Tracker Evolved
//               </Heading>
//               <Text fontSize="xl" color="gray.200">
//                 Take control of your finances with our easy-to-use tracking tools. Monitor your income, expenses, and budget all in one place.
//               </Text>
//               <Button 
//                 as={RouterLink} 
//                 to="/signup" 
//                 colorScheme="teal" 
//                 size="lg"
//                 _hover={{ bg: "teal.500" }}
//               >
//                 Get Started
//               </Button>
//             </VStack>
//             <Box 
//               mt={{ base: 8, md: 0 }} 
//               ml={{ md: 8 }}
//               bg="rgba(255, 255, 255, 0.8)" 
//               p={6} 
//               borderRadius="md" 
//               boxShadow="md"
//             >
//               <VStack spacing={4} align="start">
//                 <Heading as="h3" size="lg" color="teal.600">Features</Heading>
//                 <Text>✅ Track Income and Expenses</Text>
//                 <Text>✅ Set and Monitor Budgets</Text>
//                 <Text>✅ Visualize Financial Data</Text>
//                 <Text>✅ Secure and Easy to Use</Text>
//               </VStack>
//             </Box>
//           </Flex>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default Home;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, VStack, Container, } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      backgroundImage="url('https://images.unsplash.com/photo-1556740749-887f6717d7e4')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor="rgba(0, 0, 0, 0.6)"
        width="100%"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="container.lg">
          <VStack spacing={10} align="center" textAlign="center">
            <Heading as="h1" size="2xl" color="white">
              Welcome to Financial Tracker Evolved
            </Heading>
            <Text fontSize="xl" color="white">
              Take control of your finances with our easy-to-use tracking tools. Monitor your income, expenses, and budget all in one place.
            </Text>
            <Button 
              as={RouterLink} 
              to="/signup" 
              colorScheme="teal" 
              size="lg"
              _hover={{ bg: "teal.500" }}
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
                <Heading as="h3" size="lg" color="white">Features</Heading>
                <Text color="white">✅ Track Income and Expenses</Text>
                <Text color="white">✅ Set and Monitor Budgets</Text>
                <Text color="white">✅ Visualize Financial Data</Text>
                <Text color="white">✅ Secure and Easy to Use</Text>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;