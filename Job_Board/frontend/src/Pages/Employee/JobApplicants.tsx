import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { FaFileDownload } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import RecommendCandidate from "./RecommendCandidate";

// Styled Components
const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.875rem",
  fontWeight: 800,
  color: "#4338ca",
  marginBottom: theme.spacing(4),
  textAlign: "center",
}));

const ListWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
}));

const ApplicantItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: "#f9fafb",
  },
  transition: "background-color 0.3s",
}));

const NameEmailBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ResumeButton = styled(Button)(() => ({
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  borderRadius: "9999px",
  textTransform: "none",
  fontSize: "0.875rem",
  fontWeight: 600,
  padding: "8px 16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    backgroundColor: "#6366f1",
  },
}));

const NoApplicants = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#6b7280",
  padding: theme.spacing(8),
  fontSize: "1.125rem",
}));

// Interfaces
interface Profile {
  profilePhoto: string;
  skills: string[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Applicant {
  _id: string;
  resume: string;
  coverletter: string;
  status: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
    education: Education[];
    experience: Experience[];
    profile: Profile;
  };
}

const ApplicantByJob = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const params = useParams();
  const jobId = params.id;

  const fetchApplicants = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/api/v1/application/${jobId}/applicants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data: any = response?.data?.job?.application;
    console.log(data)
    setApplicants(data);
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return (
    <Wrapper>
      <Title>Applicants Overview</Title>
      <ListWrapper>
        <List disablePadding>
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <ApplicantItem key={applicant?._id}>
                <NameEmailBox>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#1f2937" }}>
                    {applicant?.applicant.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>
                    {applicant.applicant.email}
                  </Typography>
                </NameEmailBox>
                {applicant.status==="accepted"?(<Button variant="contained" color="success">{applicant.status}</Button>):(<Button variant="contained" color="error">{applicant.status}</Button>)}
                
                <ResumeButton
                  onClick={() => {
                    setSelectedApplicant(applicant);
                    setOpen(true);
                  }}
                >
                  <FaFileDownload size={16} />
                  View Resume
                </ResumeButton>
              </ApplicantItem>
            ))
          ) : (
            <NoApplicants>No applicants yet.</NoApplicants>
          )}
        </List>
      </ListWrapper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">Applicant Details</Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedApplicant && (
            <>
              <Typography><strong>Name:</strong> {selectedApplicant.applicant.name}</Typography>
              <Typography><strong>Email:</strong> {selectedApplicant.applicant.email}</Typography>
              <Typography><strong>Phone:</strong> {selectedApplicant.applicant.phone}</Typography>
              <Typography><strong>Status:</strong> {selectedApplicant.status}</Typography>
              <Typography sx={{ mt: 2 }}><strong>Skills:</strong> {selectedApplicant.applicant.profile.skills.join(", ")}</Typography>

              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Education</Typography>
              {selectedApplicant.applicant.education.map((edu, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography><strong>School:</strong> {edu.school}</Typography>
                  <Typography><strong>Degree:</strong> {edu.degree} in {edu.fieldOfStudy}</Typography>
                  <Typography><strong>Duration:</strong> {edu.startDate} - {edu.endDate}</Typography>
                  <Typography><strong>Description:</strong> {edu.description}</Typography>
                </Box>
              ))}

              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Experience</Typography>
              {selectedApplicant.applicant.experience.map((exp, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography><strong>Title:</strong> {exp.title}</Typography>
                  <Typography><strong>Company:</strong> {exp.company}</Typography>
                  <Typography><strong>Location:</strong> {exp.location}</Typography>
                  <Typography><strong>Duration:</strong> {exp.startDate} - {exp.endDate ?? "Present"}</Typography>
                  <Typography><strong>Description:</strong> {exp.description}</Typography>
                </Box>
              ))}
              {selectedApplicant.status === "pending" ? (
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      try {
                        await axios.put(
                          `http://localhost:5000/api/v1/employee/status/${selectedApplicant._id}`,
                          { status: "accepted" },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        setOpen(false);
                        fetchApplicants(); // Refresh list
                      } catch (error) {
                        console.error("Error updating status", error);
                      }
                    }}
                  >
                    Accept Applicant
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={async () => {
                      const token = localStorage.getItem("token");
                      try {
                        await axios.put(
                          `http://localhost:5000/api/v1/employee/status//${selectedApplicant._id}`,
                          { status: "rejected" },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        setOpen(false);
                        fetchApplicants(); // Refresh list
                      } catch (error) {
                        console.error("Error updating status", error);
                      }
                    }}
                  >
                    Reject Applicant
                  </Button>
                </Box>
              ):null}

            </>
            
          )}
        </DialogContent>
      
      </Dialog>
      {/* <RecommendCandidate jobId={jobId}></RecommendCandidate> */}
    </Wrapper>
  );
};

export default ApplicantByJob;
