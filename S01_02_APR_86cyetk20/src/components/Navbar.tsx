// Navbar.tsx
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const navItems = ["Home", "Add"];

  const handleReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/Home") {
      window.location.reload();
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          boxShadow: 3,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Title */}
          <Link
            component={RouterLink}
            to="/Home"
            underline="none"
            onClick={handleReload}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Contact Manager
            </Typography>
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => (
                <Link
                  key={item}
                  component={RouterLink}
                  to={`/${item.toLowerCase()}`}
                  underline="none"
                  sx={{
                    color: "#fff",
                    fontSize: "18px",
                    transition: "color 0.3s ease-in-out",
                    "&:hover": { color: "#e0e0e0" },
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton onClick={() => setMenuOpen(true)} sx={{ color: "#fff" }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#2575fc",
            borderRadius: "8px 0 0 8px",
            padding: 1,
            boxShadow: 3,
            width: 180,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item}
              component={RouterLink}
              to={`/${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  sx: { color: "#fff", fontSize: "16px", paddingY: 0.5 },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
