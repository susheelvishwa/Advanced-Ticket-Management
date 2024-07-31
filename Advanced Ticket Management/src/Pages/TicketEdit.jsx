import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Box,
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
      // navigate(`/ticket/view/${id}`);
    } catch (error) {
      console.error("Error updating the ticket:", error);
    }
    navigate(`/ticket/view/${id}`);
  };

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorIndicator />;

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={ticket.title}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={ticket.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="progress">Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Priority</FormLabel>
          <Select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            required
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Assignee</FormLabel>
          <Input
            name="assignee"
            value={ticket.assignee}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mr={4}>
          Save Changes
        </Button>
        <Button onClick={() => navigate(`/ticket/view/${id}`)}>Cancel</Button>
      </form>
    </Box>
  );
};

export default EditTicket;
