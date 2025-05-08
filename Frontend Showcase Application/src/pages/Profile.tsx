import { useState } from 'react';
import {styled} from '@mui/material/styles';
import { Briefcase, Edit } from 'lucide-react';
import { profileData } from '../data/profileData';
import ProfileHeader from '../components/profile/ProfileHeader';
import SkillChart from '../components/profile/SkillChart';
import ExperienceTimeline from '../components/profile/ExperienceTimeline';
import EducationSection from '../components/profile/EducationSection';
import { Box, Button, Typography } from '@mui/material';
import Modal from '../components/common/Modal';
import ProfileForm from '../components/profile/ProfileForm';

const Container = styled(Box)`
  margin: var(--space-10) 0;
`;

const Section = styled("section")`
  margin: var(--space-16) 0;
`;

const SectionHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-6);
`;

const SectionTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--space-3);
    color: var(--color-primary-600);
  }
`;

const Profile = () => {
  const [profile, setProfile] = useState(profileData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleEditProfile = (updatedProfile: typeof profileData) => {
    setProfile(updatedProfile);
    setIsEditModalOpen(false);
  };
  
  return (
    <Container className="container">
      <SectionHeader>
        <ProfileHeader info={profile.info} />
        <Button 
          variant='contained'
          color="primary" 
          endIcon={<Edit size={18} />}
          onClick={() => setIsEditModalOpen(true)}
          size='medium'
          sx={{
            width:"200px"
          }}
        >
          Edit Profile
        </Button>
      </SectionHeader>
      
      <Section>
        <SkillChart skills={profile.skills} />
      </Section>
      
      <Section>
        <SectionTitle>
          <Briefcase size={24} />
          Experience
        </SectionTitle>
        <ExperienceTimeline experiences={profile.experience} />
      </Section>
      
      <EducationSection education={profile.education} />
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        size="lg"
      >
        <ProfileForm 
          initialValues={profile}
          onSubmit={handleEditProfile}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default Profile;