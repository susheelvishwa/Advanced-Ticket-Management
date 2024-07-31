import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";

const backgroundAnimation = `
  @keyframes backgroundAnimation {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }
`;

const fontSize = "4xl"; // Adjust this value as needed

const Contact = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background="linear-gradient(45deg, #ff6f61, #dcb0ff)"
      backgroundSize="200% 200%"
      animation={`${backgroundAnimation} 10s ease infinite`}
      color="white"
      position="relative"
    >
      <style>{backgroundAnimation}</style>
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size={fontSize} fontWeight="bold">
          Contact Page
        </Heading>
      </VStack>
    </Box>
  );
};

export default Contact;
