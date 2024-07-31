import {
  Box,
  Button,
  Heading,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HomePage = () => {
  const navigate = useNavigate();

  const fontSize = useBreakpointValue({ base: "xl", md: "2xl" });

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
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size={fontSize} fontWeight="bold">
          Welcome to the Ticket Management System
        </Heading>
        <Button
          colorScheme="teal"
          variant="solid"
          px={6}
          py={3}
          borderRadius="md"
          fontSize="lg"
          fontWeight="bold"
          _hover={{
            bg: "teal.600",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease",
          }}
          onClick={() => navigate("/tickets")}
        >
          Go to Tickets
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
