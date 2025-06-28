import {
  Heading,
  Input,
  Button,
  VStack,
  Container,
  useToast,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const toast = useToast();

  async function handleClick() {
    try {
      let res = await axios({
        method: "post",
        url: "https://reqres.in/api/login",
        data: {
          email,
          password,
        },
      });

      login(res?.data?.token);

      toast({
        title: "Login Successful",
        description: "Welcome to the About page",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate(`/about`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Container maxW="md" centerContent py={12} px={{ base: 4, sm: 6, md: 8 }}>
      <Box
        bg="gray.700"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        width="full"
      >
        <VStack spacing={6}>
          <Heading as="h1" size="xl" mb={4} textAlign="center" color="white">
            Login
          </Heading>
          <h1>eve.holt@reqres.in</h1>
          <FormControl id="email">
            <FormLabel color="white">Email</FormLabel>
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outline"
              size="lg"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel color="white">Password</FormLabel>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outline"
              size="lg"
              focusBorderColor="teal.400"
            />
          </FormControl>
          <Button
            onClick={handleClick}
            colorScheme="green"
            size="lg"
            width="full"
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
