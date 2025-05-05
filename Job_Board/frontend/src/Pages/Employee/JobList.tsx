import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Chip,
    Fab,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import { useEffect, useState } from "react";
  import { AiOutlinePlus } from "react-icons/ai"; // Plus Icon
  import axios from "axios";
import { useNavigate } from "react-router-dom";
  
  interface Company {
    _id: string;
    name: string;
    description: string;
    website: string;
    location: string[];
    userId: string;
    createdAt: string;
    updatedAt: string;
    __V: string;
  }
  
  interface Job {
    _id: string;
    title: string;
    description: string;
    requirements: string[];
    salary: string;
    experience: number;
    location: string;
    jobType: string;
    position: number;
    company: Company;
    created_by: string;
    application: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  // Styled Components
  const HeaderBox = styled(Box)(({ theme }) => ({
    background: "linear-gradient(to right, #4f46e5, #7c3aed)",
    color: "white",
    padding: theme.spacing(6),
    textAlign: "center",
  }));
  
  const FilterCard = styled(Card)(({ theme }) => ({
    position: "sticky",
    top: theme.spacing(10),
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
  }));
  
  const JobCard = styled(Card)(({ theme }) => ({
    transition: "all 0.3s ease-in-out",
    borderRadius: theme.spacing(2),
    '&:hover': {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[4],
    },
  }));
  
  const AddButton = styled(Fab)(({ theme }) => ({
    position: "fixed",
    bottom: theme.spacing(4),
    left: theme.spacing(4),
    backgroundColor: "#4f46e5",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4338ca",
    },
  }));
  
  const JobList = () => {
    const [job, setJob] = useState<Job[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [locationFilter, setLocationFilter] = useState("");

    const navigate = useNavigate()
  
    const getJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get('http://localhost:5000/api/v1/job/getadminjobs', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setJob(response.data.jobs);
      } catch (error: any) {
        console.log(error?.response?.message);
      }
    };
  
    const handleTypeChange = (type: string) => {
      setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    };
  
    const handleCategoryChange = (event: any) => {
      setSelectedCategory(event.target.value as string);
    };
  
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocationFilter(event.target.value);
    };
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const handleClick = async (id: string) => {
      console.log(id);
      navigate(`/employee/job/details/${id}`)
    };
  
    const handleAddClick = () => {
      navigate("/employee/job/post")
    };
  
    const filteredJobs = job.filter((j) => {
      const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length ? selectedTypes.includes(j.jobType) : true;
      const matchesCategory =
        selectedCategory === "All Categories" ||
        selectedCategory === j.company.description;
      const matchesLocation = locationFilter
        ? j.location.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
  
      return matchesSearch && matchesType && matchesCategory && matchesLocation;
    });
  
    useEffect(() => {
      getJobs();
    }, []);
  
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", color: "#1f2937" }}>
        <HeaderBox>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Browse Jobs
          </Typography>
          <Typography variant="h6">
            Find your next career move from thousands of listings.
          </Typography>
        </HeaderBox>
  
        <Grid container spacing={4} sx={{ maxWidth: "1200px", py: 5, px: 2 }}>
          {/* Filter Sidebar */}
          <Grid  size={{xs:12,sm:4,md:3}} >
            <FilterCard>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Job Type
              </Typography>
              {["Full-Time", "Part-Time", "Internship", "Remote"].map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                    />
                  }
                  label={type}
                />
              ))}
  
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Category
                </Typography>
                <Select
                  fullWidth
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  size="small"
                >
                  {["All Categories", "Software", "Design", "Marketing", "Finance"].map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </Box>
  
              <Box mt={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Location
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter location"
                  onChange={handleLocationChange}
                />
              </Box>
            </FilterCard>
          </Grid>
  
          {/* Job Listings */}
          <Grid  size={{xs:12,sm:8,md:9}}>
            <Box display="flex" mb={3}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search jobs by title or keyword..."
                onChange={handleSearchChange}
                sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                Search
              </Button>
            </Box>
  
            <Grid container spacing={3}>
              {filteredJobs.map((j) => (
                <Grid size={{xs:12,sm:6,md:4}} key={j._id}>
                  <JobCard variant="outlined" sx={{ bgcolor: "#fff" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom>
                        {j.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {j.company.name} • {j.location}
                      </Typography>
  
                      <Box my={1} display="flex" gap={1} flexWrap="wrap">
                        <Chip
                          label={j.jobType}
                          color="secondary"
                          size="small"
                          sx={{ bgcolor: "#ede9fe", color: "#6b21a8", fontWeight: "bold" }}
                        />
                      </Box>
  
                      <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                        {j.description.slice(0, 25)}...
                      </Typography>
  
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          bgcolor: "#4f46e5",
                          '&:hover': { bgcolor: "#4338ca" },
                          borderRadius: 2,
                          textTransform: "none"
                        }}
                        onClick={() => handleClick(j._id)}
                      >
                        Show Details
                      </Button>
                    </CardContent>
                  </JobCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
  
        {/* Add Floating "+" Button */}
        <AddButton onClick={handleAddClick}>
          <AiOutlinePlus size={28} />
        </AddButton>
      </Box>
    );
  };
  
  export default JobList;
  