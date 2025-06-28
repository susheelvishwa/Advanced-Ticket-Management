import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Box,
  Heading,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../Components/LoadingIndicator";
import ErrorIndicator from "../Components/ErrorIndicator";

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    status: "",
    priority: "",
    assignee: "",
    description: "",
  });

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios.get(
          `https://react-final-project-rouge.vercel.app/tickets/${id}`
        );
        setTicket(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://react-final-project-rouge.vercel.app/tickets/${id}`,
        ticket
      );
    } catch (error) {
      console.error("Error updating the ticket:", error);
    }
    navigate(`/ticket/view/${id}`);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const formBgColor = useColorModeValue("white", "gray.700");
  const buttonColor = useColorModeValue("teal.500", "teal.200");

  return (
    <Box
      p={8}
      bg={bgColor}
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg={formBgColor}
        p={8}
        borderRadius="md"
        boxShadow="md"
        w="full"
        maxW="md"
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center" color="teal.400">
          Edit Ticket
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={ticket.title}
                onChange={handleChange}
                placeholder="Enter Title"
                focusBorderColor="teal.400"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={ticket.status}
                onChange={handleChange}
                placeholder="Select Status"
                focusBorderColor="teal.400"
              >
                <option value="pending">Pending</option>
                <option value="progress">Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Priority</FormLabel>
              <Select
                name="priority"
                value={ticket.priority}
                onChange={handleChange}
                placeholder="Select Priority"
                focusBorderColor="teal.400"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Assignee</FormLabel>
              <Input
                name="assignee"
                value={ticket.assignee}
                onChange={handleChange}
                placeholder="Enter Assignee"
                focusBorderColor="teal.400"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={ticket.description}
                onChange={handleChange}
                placeholder="Enter Description"
                focusBorderColor="teal.400"
              />
            </FormControl>
          </VStack>
          <HStack spacing={4} mt={6} justify="center">
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              bg={buttonColor}
              _hover={{ bg: "teal.600" }}
            >
              Save Changes
            </Button>
            <Button
              onClick={() => navigate(`/ticket/view/${id}`)}
              size="lg"
              variant="outline"
              colorScheme="teal"
            >
              Cancel
            </Button>
          </HStack>
        </form>
      </Box>
    </Box>
  );
};

export default EditTicket;
