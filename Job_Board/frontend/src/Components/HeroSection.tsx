import { Box, Typography, Button, Grid, Paper, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to bottom right, #4f46e5, #9333ea)",
  color: "white",
  padding: theme.spacing(10, 2),
}));

const StatCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  textAlign: "center",
  color: "white",
  boxShadow: theme.shadows[4],
}));

const HeroImage = styled("img")({
  width: "100%",
  maxWidth: 400,
  boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
});

const HeroSection = () => {
  return (
    <GradientSection>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
              Discover Your Dream Career
            </Typography>
            <Typography variant="h6" color="white" paragraph>
              Browse 10,000+ verified jobs from top companies. Apply with one click and get hired faster.
            </Typography>
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} mt={4}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "white", color: "#4f46e5", px: 4, py: 1.5, borderRadius: 999 }}
                href="#browse"
              >
                🔍 Browse Jobs
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white", px: 4, py: 1.5, borderRadius: 999,
                      '&:hover': { backgroundColor: "white", color: "#4f46e5" } }}
                href="#signup"
              >
                🚀 Join Now
              </Button>
            </Box>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <HeroImage
              src="https://cdn.pixabay.com/photo/2020/05/06/14/39/job-5131671_1280.png"
              alt="Job Search Illustration"
            />
          </Grid>
        </Grid>

        {/* KPI Section */}
        <Grid container spacing={4} mt={8}>
          {["10K+", "2K+", "98%", "24/7"].map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <StatCard>
                <Typography variant="h5" fontWeight={700}>{stat}</Typography>
                <Typography variant="body2" mt={1}>
                  {[
                    "Active Job Listings",
                    "Companies Hiring",
                    "Job Seeker Satisfaction",
                    "Support Available"
                  ][i]}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GradientSection>
  );
};

export default HeroSection;
