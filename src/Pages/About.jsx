import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Fade,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useState } from "react";

// Define keyframes for background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const textAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 0.5; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const buttonAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const AboutPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      background="linear-gradient(45deg, #ff6f61, #dcb0ff, #4facfe, #00f2fe)"
      backgroundSize="400% 400%"
      animation={`${gradientAnimation} 15s ease infinite`}
      color="white"
      p={6}
      position="relative"
      overflow="hidden"
    >
      {/* Animated Background Circles */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        background="radial-gradient(circle, rgba(255,255,255,0.2) 20%, transparent 60%)"
        opacity="0.9"
        animation={`${gradientAnimation} 2s linear infinite`}
        zIndex={0}
      />

      <VStack spacing={6} textAlign="center" zIndex={1}>
        <Fade in={true} transition={{ enter: { duration: 10 } }}>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="bold"
            mb={4}
            animation={`${textAnimation} 2s ease-out`}
          >
            About Us
          </Heading>
        </Fade>
        <Text fontSize="lg" animation={`${textAnimation} 2.5s ease-out`}>
          Welcome to the Ticket Management System! We are dedicated to providing
          the best ticketing experience for our users. Our system is designed to
          help you manage and track your tickets efficiently. Whether you are
          handling support tickets or event reservations, our platform is here
          to assist you every step of the way.
        </Text>
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
          animation={`${buttonAnimation} 1s infinite`}
          onClick={onOpen}
        >
          Learn More
        </Button>
      </VStack>

      {/* Drawer for additional information */}
      <Drawer isOpen={isOpen} placement="" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Additional Information</DrawerHeader>

          <DrawerBody>
            <Text>
              Here you can find more detailed information about our ticket
              management system, including features, benefits, and how to use
              the platform effectively. We are committed to ensuring you have
              the best experience possible.
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AboutPage;
