import { Button, Box, Text, Flex, Heading, Grid } from "@chakra-ui/react";
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
      navigate("/tickets");
    } catch (error) {
      console.error("Error deleting the ticket:", error);
    }
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <Box p={2} m={120} borderBottom={"2px"}>
      {ticket ? (
        <>
          <Heading m={5} color={"gray"} as="h2" size="lg" mb={4}>
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
          <Flex m={5} justifyContent="space-between">
            <Button
              colorScheme="teal"
              onClick={() => navigate(`/ticket/edit/${id}`)}
            >
              Edit Ticket
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
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
