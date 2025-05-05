import React, { useState } from "react";
import { styled, keyframes } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Chip,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

// Job Data
const jobs = [
  {
    title: "Frontend Developer",
    company: "TechSphere",
    location: "Remote",
    type: "Full-Time",
    salary: "$60k - $90k",
    tags: ["React", "Tailwind", "JavaScript"],
  },
  {
    title: "Backend Engineer",
    company: "DataCrate Inc.",
    location: "Bangalore, India",
    type: "Full-Time",
    salary: "$70k - $100k",
    tags: ["Node.js", "MongoDB", "AWS"],
  },
  {
    title: "UI/UX Designer",
    company: "DesignVerse",
    location: "Remote",
    type: "Part-Time",
    salary: "$40k - $65k",
    tags: ["Figma", "Adobe XD", "Design Thinking"],
  },
];

const JobPage = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <AnimatedBackground>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Logo variant="h6">
            <span style={{ color: "#6366f1" }}>JobSeeker</span>X
          </Logo>
          <NavLinks>
            <NavButton variant="text">Home</NavButton>
            <NavButton variant="text">Jobs</NavButton>
            <NavButton variant="text">Companies</NavButton>
            <NavButton variant="text">Contact</NavButton>
          </NavLinks>
          <StyledLoginButton variant="contained" whileTap={{ scale: 0.95 }}>
            Login / Sign Up
          </StyledLoginButton>
        </StyledToolbar>
      </StyledAppBar>

      <MotionContainer
        maxWidth="lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StyledGrid container spacing={2} mb={4}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search job title or company"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SearchButton
              fullWidth
              variant="contained"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              Search Jobs
            </SearchButton>
          </Grid>
        </StyledGrid>

        <Typography variant="h6" gutterBottom>
          Latest Jobs
        </Typography>

        <Grid container spacing={3}>
          {filteredJobs.map((job, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <MotionCard
                elevation={4}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {job.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.company} • {job.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {job.type} • {job.salary}
                  </Typography>
                  <TagContainer>
                    {job.tags.map((tag, i) => (
                      <Chip key={i} label={tag} color="primary" size="small" />
                    ))}
                  </TagContainer>
                  <ApplyButton
                    variant="contained"
                    fullWidth
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply Now
                  </ApplyButton>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </MotionContainer>

      <Footer>
        © {new Date().getFullYear()} JobSeekerX. All rights reserved.
      </Footer>
    </AnimatedBackground>
  );
};

// Animations
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const AnimatedBackground = styled("div")`
  min-height: 100vh;
  padding-bottom: 50px;
  background: linear-gradient(270deg, #e0f7fa, #f3e5f5, #e8f5e9);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const StyledAppBar = styled(AppBar)`
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled(Typography)`
  font-weight: bold;
`;

const NavLinks = styled("div")`
  display: flex;
  gap: 20px;
`;

const NavButton = styled(Button)`
  color: #374151;
  font-weight: 500;
  text-transform: none;
`;

const StyledLoginButton = motion(Button);

const MotionContainer = motion(Container);

const StyledGrid = styled(Grid)`
  margin-top: 32px;
`;

const SearchButton = motion(Button);

const MotionCard = motion(Card);

const TagContainer = styled("div")`
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ApplyButton = motion(Button);

const Footer = styled("footer")`
  margin-top: 60px;
  padding: 20px 0;
  text-align: center;
  font-size: 14px;
  background-color: #ffffffcc;
  color: #555;
  border-top: 1px solid #ddd;
`;

export default JobPage;
