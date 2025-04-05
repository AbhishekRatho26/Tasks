import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const Home: React.FC = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#2563eb" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            MyApp
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Welcome, {username}</Typography>
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#dc2626",
                color: "#fff",
                paddingX: 2,
                paddingY: 1,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#b91c1c",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingY: 6,
          marginTop: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Discover Something New
        </Typography>
        <Typography variant="body1" sx={{ color: "#4b5563", maxWidth: 640 }}>
          This is a random hero section text where you can put an exciting
          description about your platform. Engage your users with a compelling
          message and guide them to explore your content.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
