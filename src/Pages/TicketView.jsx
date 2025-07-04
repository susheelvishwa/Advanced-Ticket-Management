import { Button, Box, Text, Flex, Heading } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingIndicator from "../Components/LoadingIndicator";
import ErrorIndicator from "../Components/ErrorIndicator";

const ViewTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ticket, setTicket] = useState(null);

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

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://react-final-project-rouge.vercel.app/tickets/${id}`
      );
    } catch (error) {
      console.error("Error deleting the ticket:", error);
    }
    navigate("/tickets");
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <Box
      p={4}
      m="auto"
      marginTop="100px"
      maxWidth="800px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      {ticket ? (
        <>
          <Heading m={5} color={"gray.300"} as="h1" size="lg" mb={9}>
            {ticket.title}
          </Heading>
          <Text m={5} mb={2}>
            <strong>Status:</strong> {ticket.status}
          </Text>
          <Text m={5} mb={2}>
            <strong>Priority:</strong> {ticket.priority}
          </Text>
          <Text m={5} mb={2}>
            <strong>Assigned to:</strong> <b color="red"> {ticket.assignee}</b>
          </Text>
          <Text m={5} mb={4}>
            <strong>Description:</strong> {ticket.description}
          </Text>
          <Flex m={5} justifyContent="space-between" flexWrap="wrap">
            <Button
              colorScheme="teal"
              mb={{ base: 2, md: 0 }}
              onClick={() => navigate(`/ticket/edit/${id}`)}
            >
              Edit Ticket
            </Button>
            <Button
              colorScheme="red"
              mb={{ base: 2, md: 0 }}
              onClick={handleDelete}
            >
              Delete Ticket
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/tickets")}>
              Back to Tickets
            </Button>
          </Flex>
        </>
      ) : (
        <Text>No ticket found</Text>
      )}
    </Box>
  );
};

export default ViewTicket;
