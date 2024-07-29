import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from "@chakra-ui/react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Stack align="center" position="fixed" bottom="20px" left="50%" transform="translateX(-50%)" spacing={4} width="auto">
      <Button onClick={() => navigate(-1)} width="20px" height="5px" outlineColor="black" padding="15px" backgroundColor="white" color="green" variant="solid" marginBottom="20px" as='b' mb={4}>
        Back
      </Button>
    </Stack>
  );
};

export default BackButton;