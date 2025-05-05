import { Typography, Box, Button, CircularProgress, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";

// TYPES
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

interface Profile {
  profilePhoto: string;
  skills: string[];
  bio: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  education: Education[];
  experience: Experience[];
  profile: Profile;
}

// STYLED COMPONENTS
const Container = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: auto;
`;

const EditButton = styled(Button)`
  margin-top: 16px;
  color: #3f51b5;
`;

const ProfileCard = styled(Card)`
  margin-bottom: 20px;
`;

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    skills: '',
    experience: [{ title: '', company: '', location: '', startDate: '', endDate: '', description: '' }],
    education: [{ school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }]
  });

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get<User>("http://localhost:5000/api/v1/user/profile/currentUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setFormData({
        ...formData,
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone.toString(),
        bio: response.data.profile.bio,
        skills: response.data.profile.skills.join(", "),
        experience: response.data.experience,
        education: response.data.education
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    console.log(formData)
    try {
      await axios.post("http://localhost:5000/api/v1/user/profile/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
      getUserProfile(); 
    } catch (error) {
      console.error("Error saving user profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteExperience = (index: number) => {
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };
  
  const handleDeleteEducation = (index: number) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string, index: number = -1) => {
    const { value } = e.target;
    if (key === "experience" || key === "education") {
      const updatedArr = [...formData[key]];
      if (index !== -1) {
        updatedArr[index] = { ...updatedArr[index], [e.target.name]: value };
      }
      setFormData({ ...formData, [key]: updatedArr });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };
  const handleAddExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };
  
  const handleAddEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' }
      ]
    }));
  };
  
  return (
    <Container>
      {loading && <CircularProgress />}
      {!loading && user && (
        <>
          <Typography variant="h4">Profile</Typography>
          <Box display="flex" justifyContent="flex-end">
            <EditButton onClick={handleEditClick} startIcon={<EditIcon />}>
              Edit Profile
            </EditButton>
          </Box>

          <ProfileCard>
            <CardContent>
              <Typography variant="h6">Personal Information</Typography>
              <Typography>Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Phone: {user.phone}</Typography>
              <Typography>Bio: {user.profile.bio}</Typography>
              <Typography>Skills: {user.profile.skills.join(", ")}</Typography>
            </CardContent>
          </ProfileCard>

          <ProfileCard>
            <CardContent>
              <Typography variant="h6">Experience</Typography>
              {user.experience.map((exp, index) => (
                <Box key={index} mb={2}>
                  <Typography><strong>Title:</strong> {exp.title}</Typography>
                  <Typography><strong>Company:</strong> {exp.company}</Typography>
                  <Typography><strong>Location:</strong> {exp.location}</Typography>
                  <Typography><strong>Start Date:</strong> {exp.startDate}</Typography>
                  <Typography><strong>End Date:</strong> {exp.endDate || "Present"}</Typography>
                  <Typography><strong>Description:</strong> {exp.description}</Typography>
                </Box>
              ))}
            </CardContent>
          </ProfileCard>

          <ProfileCard>
            <CardContent>
              <Typography variant="h6">Education</Typography>
              {user.education.map((edu, index) => (
                <Box key={index} mb={2}>
                  <Typography><strong>School:</strong> {edu.school}</Typography>
                  <Typography><strong>Degree:</strong> {edu.degree}</Typography>
                  <Typography><strong>Field of Study:</strong> {edu.fieldOfStudy}</Typography>
                  <Typography><strong>Start Date:</strong> {edu.startDate}</Typography>
                  <Typography><strong>End Date:</strong> {edu.endDate}</Typography>
                  <Typography><strong>Description:</strong> {edu.description}</Typography>
                </Box>
              ))}
            </CardContent>
          </ProfileCard>
        </>
      )}

<Dialog open={isEditing} onClose={handleCloseEdit}>
  <DialogTitle>Edit Profile</DialogTitle>
  <DialogContent>
    {/* Basic Details */}
    <TextField
      label="Name"
      value={formData.name}
      onChange={(e) => handleChange(e, "name")}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Email"
      value={formData.email}
      onChange={(e) => handleChange(e, "email")}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Phone"
      value={formData.phone}
      onChange={(e) => handleChange(e, "phone")}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Bio"
      value={formData.bio}
      onChange={(e) => handleChange(e, "bio")}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Skills (comma separated)"
      value={formData.skills}
      onChange={(e) => handleChange(e, "skills")}
      fullWidth
      margin="normal"
    />

    {/* Experience Section */}
    <Typography variant="h6" sx={{ mt: 3 }}>Experience</Typography>
    {formData.experience.map((exp, index) => (
      <Box key={index} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, my: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={exp.title || ''}
          onChange={(e) => handleChange(e, "experience", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Company"
          name="company"
          value={exp.company || ''}
          onChange={(e) => handleChange(e, "experience", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={exp.location || ''}
          onChange={(e) => handleChange(e, "experience", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={exp.startDate || ''}
          onChange={(e) => handleChange(e, "experience", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={exp.endDate || ''}
          onChange={(e) => handleChange(e, "experience", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={exp.description || ''}
          onChange={(e) => handleChange(e, "experience", index)}
          fullWidth
          margin="normal"
        />
         <Button onClick={() => handleDeleteExperience(index)} color="error">
           Delete
          </Button>
      </Box>
      
    ))}
    <Button onClick={handleAddExperience} variant="outlined" color="primary" sx={{ mb: 2 }}>
      Add Experience
    </Button>

    {/* Education Section */}
    <Typography variant="h6" sx={{ mt: 3 }}>Education</Typography>
    {formData.education.map((edu, index) => (
      <Box key={index} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, my: 2 }}>
        <TextField
          label="School"
          name="school"
          value={edu.school || ''}
          onChange={(e) => handleChange(e, "education", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Degree"
          name="degree"
          value={edu.degree || ''}
          onChange={(e) => handleChange(e, "education", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Field of Study"
          name="fieldOfStudy"
          value={edu.fieldOfStudy || ''}
          onChange={(e) => handleChange(e, "education", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          value={edu.startDate || ''}
          onChange={(e) => handleChange(e, "education", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          value={edu.endDate || ''}
          onChange={(e) => handleChange(e, "education", index)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={edu.description || ''}
          onChange={(e) => handleChange(e, "education", index)}
          fullWidth
          margin="normal"
        />
        <Button onClick={() => handleDeleteEducation(index)} color="error">
           Delete
        </Button>
      </Box>
    ))}
    <Button onClick={handleAddEducation} variant="outlined" color="primary" sx={{ mb: 2 }}>
      Add Education
    </Button>
  </DialogContent>

  {/* Dialog Actions */}
  <DialogActions>
    <Button onClick={handleCloseEdit} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSaveProfile} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>
    </Container>
  );
};

export default Profile;
