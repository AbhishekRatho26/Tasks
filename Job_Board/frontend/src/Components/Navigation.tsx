import { AppBar, Toolbar, IconButton, Typography, Button, Box } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styled Components for the navbar
const NavbarWrapper = styled(AppBar)`
  background-color: #4f46e5; /* Indigo color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MenuButton = styled(IconButton)`
  color: white;
  font-size: 2rem;
`;

const DesktopMenu = styled(Box)`
  display: flex;
  gap: 20px;
`;

const MobileMenu = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: #4f46e5; /* Indigo color */
`;

const NavLink = styled(Button)`
  color: white;
  &:hover {
    color: #c7d2fe; /* Indigo 200 */
  }
`;

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [student, setStudent] = useState(false);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed?.role === "student") {
          setStudent(true);
        }
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, []);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Links based on the role (student or employee)
  const studentLinks = [
    { label: "Home", onClick: () => navigate("/") },
    { label: "Browse Jobs", onClick: () => navigate("/seeker/jobs") },
    { label: "My Applications", onClick: () => navigate("/seeker/applications") },
    { label: "Profile",onclick:()=>navigate("/seeker/profile") },
    { label: "Resume Chat",  onClick: () => navigate("/seeker/resume") },
    { label: "Sign Out", onClick: handleLogout },
  ];

  const employeeLinks = [
    { label: "Home", onClick: () => navigate("/employee/dashboard") },
    { label: "Jobs", onClick: () => navigate("/employee/jobs") },
    { label: "Applicants", onClick: () => navigate("/employee/job/appplicants") },
    { label: "Company", onClick: () => navigate("/employee/company/post") },
    { label: "Sign Out", onClick: handleLogout },
  ];

  const menuLinks = student ? studentLinks : employeeLinks;

  return (
    <NavbarWrapper position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="white">
          {student ? "JobSeekers" : "Employee"}
        </Typography>

        {/* Desktop Menu */}
        <DesktopMenu sx={{ display: { xs: "none", md: "flex" } }}>
          {menuLinks.map((link, index) => (
            <NavLink key={index} onClick={link.onClick}>
              {link.label}
            </NavLink>
          ))}
        </DesktopMenu>

        {/* Mobile Menu Icon (only visible on small screens) */}
        <MenuButton
          edge="end"
          onClick={toggleMenu}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MenuButton>
      </Toolbar>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu>
          {menuLinks.map((link, index) => (
            <NavLink key={index} onClick={link.onClick}>
              {link.label}
            </NavLink>
          ))}
        </MobileMenu>
      )}
    </NavbarWrapper>
  );
};

export default Navigation;
