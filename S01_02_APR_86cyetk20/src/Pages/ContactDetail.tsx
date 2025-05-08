import { useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/store";

interface RouteParams {
  id: string;
}

const ContactDetail = () => {
  const { id } = useParams<RouteParams>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const contact = contacts.find((c) => c.id === id);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (!contact) {
      navigate("/home");
    }
  }, [contact, navigate]);

  if (!contact) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        Contact not found!
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f4f7fc"
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 400,
          textAlign: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={3}
        >
          {contact.photo ? (
            <Avatar
              src={contact.photo}
              alt="Profile"
              sx={{
                width: 100,
                height: 100,
                border: "3px solid #007bff",
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "#007bff",
                fontSize: 32,
                fontWeight: "bold",
                border: "3px solid #007bff",
              }}
            >
              {contact.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography variant="h5" mt={2} color="#333" fontWeight="bold">
            {contact.name}
          </Typography>
          <Typography variant="body2" color="#777">
            {contact.email}
          </Typography>
        </Box>

        <Box
          textAlign="left"
          p={2}
          bgcolor="#f8f9fa"
          borderRadius={2}
          boxShadow="inset 0 0 10px rgba(155, 81, 81, 0.05)"
        >
          <Typography variant="body1" mb={1}>
            <strong>Phone:</strong> {contact.phone}
          </Typography>
          <Typography variant="body1" mb={1}>
            <strong>Company:</strong> {contact.company || "N/A"}
          </Typography>
          <Typography variant="body1" mb={1}>
            <strong>Address:</strong> {contact.address || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Notes:</strong> {contact.notes || "N/A"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ContactDetail;
