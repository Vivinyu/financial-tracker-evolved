// import React, { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { Box, Heading, Input, Button, Text, VStack, Container, useToast } from "@chakra-ui/react";
// import { ADD_BUDGET } from '../utils/mutations';
// import { QUERY_BUDGET } from '../utils/queries';
// import BackButton from '../components/BackButton';

// const Budget = () => {
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const { loading, data, refetch } = useQuery(QUERY_BUDGET);
//   const [addBudget] = useMutation(ADD_BUDGET);
//   const toast = useToast();

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await addBudget({
//         variables: { amount: parseFloat(budgetAmount) },
//       });
//       setBudgetAmount('');
//       refetch(); // Refetch the budget query to update the displayed amount
//       toast({
//         title: "Budget updated.",
//         description: "Your budget has been successfully updated.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (e) {
//       console.error(e);
//       toast({
//         title: "Error",
//         description: "Failed to update budget. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <Container maxW="container.md" centerContent>
//       <BackButton />
//       <VStack spacing={4} align="stretch" width="100%">
//         <Heading as="h2" size="xl" textAlign="center">Budget</Heading>
//         <form onSubmit={handleFormSubmit}>
//           <VStack spacing={4}>
//             <Input 
//               type="number" 
//               placeholder="Enter budget amount" 
//               value={budgetAmount}
//               onChange={(e) => setBudgetAmount(e.target.value)}
//             />
//             <Button colorScheme="teal" type="submit" width="100%">Set Budget</Button>
//           </VStack>
//         </form>
//         {loading ? (
//           <Text>Loading...</Text>
//         ) : (
//           <Box textAlign="center" p={4} borderWidth={1} borderRadius="lg">
//             <Text fontSize="xl">Current Budget: ${data?.budget?.amount || 0}</Text>
//           </Box>
//         )}
//       </VStack>
//     </Container>
//   );
// };

// export default Budget;


import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Heading, Input, Button, Text, VStack, Container, useToast, Stack } from "@chakra-ui/react";
import { ADD_BUDGET } from '../utils/mutations';
import { QUERY_BUDGET } from '../utils/queries';
import BackButton from '../components/BackButton';

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState('');
  const { loading, data, refetch } = useQuery(QUERY_BUDGET);
  const [addBudget] = useMutation(ADD_BUDGET);
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBudget({
        variables: { amount: parseFloat(budgetAmount) },
      });
      setBudgetAmount('');
      refetch(); // Refetch the budget query to update the displayed amount
      toast({
        title: "Budget updated.",
        description: "Your budget has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: "Error",
        description: "Failed to update budget. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" centerContent>
      <VStack spacing={4} align="stretch" width="100%">
        <BackButton />
        <Stack>
          <Heading as="h2" size="xl" fontSize="40px" textAlign="center" color="green" marginBottom="30px" marginTop="100px">Budget</Heading>
        </Stack>
        <form onSubmit={handleFormSubmit}>
          <VStack spacing={4}>
            <Input 
              type="number" 
              placeholder="Enter budget amount" 
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
              padding="10px"
              marginBottom="30px"
            />
            <Button colorScheme="teal" type="submit" width="12%" backgroundColor="white" color="green" variant="solid" marginBottom="20px">Set Budget</Button>
          </VStack>
        </form>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <Box bg='green' h='100px' color='white' p={4} display="flex" alignItems="center" justifyContent="center" as='b'>
            <Text fontSize="xl">Current Budget: ${data?.budget?.amount || 0}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Budget;