import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import { FaFileDownload } from "react-icons/fa";

// Styled Components
const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "1.875rem",
  fontWeight: 800,
  color: "#4338ca", // Indigo-700
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
    backgroundColor: "#f9fafb", // gray-50
  },
  transition: "background-color 0.3s",
}));

const NameEmailBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const ResumeButton = styled(Button)(({ }) => ({
  backgroundColor: "#4f46e5", // Indigo-600
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
    backgroundColor: "#6366f1", // Indigo-500
  },
}));

const NoApplicants = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  color: "#6b7280", // gray-500
  padding: theme.spacing(8),
  fontSize: "1.125rem",
}));

const ApplicantsList = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      const data:any = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", resume: "https://example.com/resume1.pdf" },
        { id: 2, name: "Bob Smith", email: "bob@example.com", resume: "https://example.com/resume2.pdf" },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", resume: "https://example.com/resume3.pdf" },
      ];
      setApplicants(data);
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <Wrapper>
      <Title>Applicants Overview</Title>
      <ListWrapper>
        <List disablePadding>
          {applicants.length > 0 ? (
            applicants.map((applicant) => (
              <ApplicantItem key={applicant.id}>
                <NameEmailBox>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "#1f2937" }}>
                    {applicant.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>
                    {applicant.email}
                  </Typography>
                </NameEmailBox>
                <ResumeButton
                  component="a"
                  href={applicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
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
    </Wrapper>
  );
};

export default ApplicantsList;
