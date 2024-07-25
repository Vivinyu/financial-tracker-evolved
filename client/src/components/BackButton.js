import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@chakra-ui/react";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} colorScheme="teal" variant="outline" mb={4}>
      Back
    </Button>
  );
};

export default BackButton;


// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { Button } from "@chakra-ui/react";

// const BackButton = () => {
//   const history = useHistory();

//   return (
//     <Button onClick={() => history.goBack()} colorScheme="teal" variant="outline" mb={4}>
//       Back
//     </Button>
//   );
// };

// export default BackButton;

