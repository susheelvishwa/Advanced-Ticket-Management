import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TicketCard({ id, title, status, priority, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios({
        method: "delete",
        url: `https://react-final-project-rouge.vercel.app/tickets/${id}`,
      });
      onDelete(id); // Call the onDelete callback with the ticket ID
      navigate("/tickets");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Status
            </Heading>
            <Text pt="2" fontSize="sm">
              {status}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Priority
            </Heading>
            <Text pt="2" fontSize="sm">
              {priority}
            </Text>
          </Box>
          <Box>
            <Button
              variant="outline"
              colorScheme="red"
              margin={"5px"}
              onClick={() => navigate(`/ticket/view/${id}`)}
            >
              View Ticket
            </Button>
            <Button
              variant="outline"
              colorScheme="red"
              onClick={() => navigate(`/ticket/edit/${id}`)}
            >
              Edit Ticket
            </Button>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
