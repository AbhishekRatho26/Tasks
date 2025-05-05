import  { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Button, Grid, Link,Dialog,DialogActions,DialogTitle,DialogContent,TextField } from '@mui/material';
import { styled } from 'styled-components';
import { FaMoneyBillWave, FaMapMarkerAlt, FaBriefcase, FaClock, FaExternalLinkAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Background = styled(Box)`
  background: linear-gradient(to bottom right, #eef2ff, #f5f3ff, #fdf2f8);
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlassCard = styled(Paper)`
  background: white;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
`;

const IconBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ApplyButton = styled(Button)`
  && {
    background-color: #4f46e5;
    color: white;
    font-weight: bold;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    border-radius: 9999px;
    text-transform: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    &:hover {
      background-color: #4338ca;
      transform: scale(1.05);
    }
  }
`;

const SmallLink = styled(Link)`
  && {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #6366f1;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// const job = {
//   _id: "6811a67a0af8e437e91bccd5",
//   title: "Software Engineer",
//   description: "Ability to code, ability to debug",
//   requirements: ["C", "Python", "Java"],
//   salary: "500000",
//   experience: 0,
//   location: "Hyderabad",
//   jobType: "Full-time",
//   position: 2,
//   company: {
//     name: "Hiringhood",
//     description: "An AI based startup located in Hyderabad established in 2020",
//     website: "https://www.hiringhood.in",
//     location: ["Hyderabad"],
//   },
// };
interface Company{
  location:string[];
  name:string;
  _id:string;
}
interface Job{
  application:string;
  company:Company;
  createdAt:string;
  created_by:string;
  description:string;
  experience:string;
  jobType:string;
  location:string;
  position:string;
  requirements:string[];
  salary:string;
  title:string;
  updatedAt:string;
  __v:string;
  _id:string;
}
const JobDetailsPage = () => {
  const params = useParams()
  const [job,setJob] = useState<Job>()
  const [resume,setResume] = useState("")
  const [coverletter,setCoverletter] = useState("")

  
  const [openDialogBox,setOpenDialogBox]= useState(false)

  const fetchJob = async ()=>{
    const token = localStorage.getItem("token")
    const jobId = params.id
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/job/jobs/${jobId}`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      setJob(response?.data?.job)
    } catch (error:any) {
      console.log(error)
    }
     
  }

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/application/apply/${params.id}`,
        { resume, coverletter },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-store',
          },
        }
      );

      if (response.data.success) {
        alert('Application submitted successfully!');
        setOpenDialogBox(false);
      }
    } catch (error:any) {
      alert(error?.response?.data?.message)
      setOpenDialogBox(false);
    }
  }
  useEffect(()=>{
    fetchJob()
  },[])
  useEffect(()=>{
    console.log(job?.experience)
  })
  return (
    <Background>
      <Container maxWidth="lg">
        <GlassCard elevation={8}>
          {/* Job Title and Company */}
          <Box mb={6}>
            <Typography variant="h4" fontWeight="bold" color="#4f46e5" mb={1}>
              {job?.title}
            </Typography>
            <SmallLink href={job?.company} target="_blank" underline="hover">
              {job?.company?.name}
              <FaExternalLinkAlt size={14} />
            </SmallLink>
          </Box>

          {/* Job Basic Info */}
          <Grid container spacing={4} mb={6}>
            <Grid size={{xs:12,md:6}}>
              <IconBox>
                <FaMoneyBillWave color="#6366f1" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Salary</Typography>
                  <Typography fontWeight="600" color="text.primary">{job?.salary} / year</Typography>
                </Box>
              </IconBox>
            </Grid>
            <Grid size={{xs:12,md:6}}>
              <IconBox>
                <FaMapMarkerAlt color="#ec4899" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Location</Typography>
                  <Typography fontWeight="600" color="text.primary">{job?.location}</Typography>
                </Box>
              </IconBox>
            </Grid>
            <Grid size={{xs:12,md:6}}>
              <IconBox>
                <FaClock color="#22c55e" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Experience</Typography>
                  <Typography fontWeight="600" color="text.primary">{job?.experience} years</Typography>
                </Box>
              </IconBox>
            </Grid>
            <Grid size={{xs:12,md:6}}>
              <IconBox>
                <FaBriefcase color="#facc15" />
                <Box>
                  <Typography variant="body2" color="text.secondary">Job Type</Typography>
                  <Typography fontWeight="600" color="text.primary" textTransform="capitalize">{job?.jobType}</Typography>
                </Box>
              </IconBox>
            </Grid>
          </Grid>

          {/* Job Description */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" color="#4f46e5" mb={2}>
              Job Description
            </Typography>
            <Typography color="text.primary" lineHeight={1.7}>
              {job?.description}
            </Typography>
          </Box>

          {/* Requirements */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" color="#4f46e5" mb={2}>
              Requirements
            </Typography>
            <Box component="ul" sx={{ pl: 2, listStyleType: 'disc', color: 'text.primary' }}>
              {job?.requirements.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </Box>
          </Box>

          {/* About Company */}
          <Box mb={6}>
            <Typography variant="h5" fontWeight="bold" color="#4f46e5" mb={2}>
              About Company
            </Typography>
            <Typography color="text.primary" mb={2}>
              {job?.description}
            </Typography>
            <IconBox>
              <FaMapMarkerAlt color="#ec4899" size={16} />
              <Typography variant="body2" color="text.secondary">
                {job?.company.location.join(', ')}
              </Typography>
            </IconBox>
            <Box mt={1}>
              {/* <SmallLink href={job.company.website} target="_blank">
                Visit Website <FaExternalLinkAlt size={12} />
              </SmallLink> */}
            </Box>
          </Box>

          {/* Apply Button */}
          <Box textAlign="center">
            <ApplyButton variant="contained" onClick={()=>setOpenDialogBox(true)}>
              Apply Job
            </ApplyButton>
          </Box>
        </GlassCard>
      </Container>
      <Dialog open={openDialogBox} onClose={()=>setOpenDialogBox(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Apply for the Job</DialogTitle>
      <DialogContent>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Resume Link"
            type="url"
            name="resume"
            fullWidth
            required
            value={resume}
            onChange={(e)=>setResume(e.target.value)}
            placeholder="https://example.com/your-resume"
          />
          <TextField
            label="Cover Letter"
            name="coverLetter"
            multiline
            rows={6}
            fullWidth
            required
            value={coverletter}
            onChange={(e)=>setCoverletter(e.target.value)}
            placeholder="Write your cover letter here..."
          />
        </StyledForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpenDialogBox(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
          Submit Application
        </Button>
      </DialogActions>
    </Dialog>
    </Background>
  );
};

export default JobDetailsPage;
