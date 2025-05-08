import {styled} from '@mui/material/styles';
import { Mail, Linkedin, Github, Globe } from 'lucide-react';
import { ProfileInfo } from '../../utils/types';
import { Box, Button, Typography } from '@mui/material';

interface ProfileHeaderProps {
  info: ProfileInfo;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: var(--space-8);
  }
`;

const AvatarSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 768px) {
    flex: 0 0 250px;
  }
`;

const Avatar = styled("img")`
  width: 200px;
  height: 200px;
  border-radius: var(--radius-full);
  object-fit: cover;
  box-shadow: var(--shadow-md);
  
  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const InfoSection = styled(Box)`
  margin-top: var(--space-6);
  
  @media (min-width: 768px) {
    margin-top: 0;
    flex: 1;
  }
`;

const Name = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-primary-600);
  margin: var(--space-2) 0 var(--space-6) 0;
`;

const About = styled(Typography)`
  line-height: 1.6;
  color: var(--color-gray-700);
  margin-bottom: var(--space-6);
`;

const ContactLinks = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
`;

const ProfileHeader = ({ info }: ProfileHeaderProps) => {
  const { name, title, avatar, about, contact } = info;
  
  return (
    <Container>
      <AvatarSection>
        <Avatar src={avatar} alt={name} />
      </AvatarSection>
      
      <InfoSection>
        <Name>{name}</Name>
        <Title>{title}</Title>
        <About>{about}</About>
        
        <ContactLinks>
          <Button 
            variant="outlined" 
            size="small" 
            endIcon={<Mail size={16} />}
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </Button>
          
          {contact.linkedin && (
            <Button 
              variant="outlined" 
              size="small" 
              endIcon={<Linkedin size={16} />}
              href={`https://${contact.linkedin}`}
            >
              LinkedIn
            </Button>
          )}
          
          {contact.github && (
            <Button 
              variant="outlined" 
              size="small" 
              endIcon={<Github size={16} />} 
              href={`https://${contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
          )}
          
          {contact.website && (
            <Button 
              variant="outlined" 
              size="small" 
              endIcon={<Globe size={16} />} 
              href={`https://${contact.website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </Button>
          )}
        </ContactLinks>
      </InfoSection>
    </Container>
  );
};

export default ProfileHeader;