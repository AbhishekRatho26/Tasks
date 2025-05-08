import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteContact } from "../redux/contactSlice";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  Paper,
  Stack,
} from "@mui/material";

const Home: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const filteredContacts = sortedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="#f0f4f8">
      <Navbar />
      <Box flex={1} display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
        <Typography variant="h4" gutterBottom color="textPrimary">
          Contacts List
        </Typography>

        <TextField
          variant="outlined"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300, mb: 3 }}
        />

        {filteredContacts.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No Contacts Found
          </Typography>
        ) : (
          <Stack spacing={2} width="100%" maxWidth={900}>
            {filteredContacts.map((contact) => (
              <Paper
                key={contact.id}
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 2,
                }}
              >
                <Link
                  to={`/contact/${contact.id}`}
                  style={{ textDecoration: "none", display: "flex", flex: 1, alignItems: "center", gap: 16 }}
                >
                  {contact.photo ? (
                    <Avatar src={contact.photo} sx={{ width: 60, height: 60 }} />
                  ) : (
                    <Avatar sx={{ width: 60, height: 60, bgcolor: "#1E40AF" }}>
                      {getInitials(contact.name)}
                    </Avatar>
                  )}
                  <Box textAlign="left">
                    <Typography variant="h6" color="textPrimary">
                      {contact.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> {contact.email}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {contact.phone}
                    </Typography>
                  </Box>
                </Link>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(deleteContact(contact.id))}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (contact?.id) {
                        localStorage.setItem("id", contact.id);
                        navigate("/edit");
                      } else {
                        console.error("Contact ID is undefined");
                      }
                    }}
                  >
                    Edit
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        <Link to="/add" style={{ textDecoration: "none", marginTop: 20 }}>
          <Button variant="contained" color="success" sx={{ px: 4, py: 1.5, fontSize: "1rem" }}>
            + Add New Contact
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Home;
