import {styled} from '@mui/material/styles';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { FrontendProject } from '../../utils/types';
import { Box, Button, Typography } from '@mui/material';

interface ProjectDetailsProps {
  project: FrontendProject;
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Title = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
`;

const Description = styled(Typography)`
  font-size: 1.125rem;
  color: var(--color-gray-700);
  line-height: 1.6;
  margin: var(--space-4) 0;
`;

const ActionButtons = styled(Box)`
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
`;

const TechStack = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
`;

const TechBadge = styled(Box)`
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
`;

const Section = styled(Box)`
  margin-top: var(--space-6);
`;

const SectionTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-800);
  margin: 0 0 var(--space-4) 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 1.25rem;
    background-color: var(--color-primary-500);
    margin-right: var(--space-3);
    border-radius: var(--radius-sm);
  }
`;

const List = styled("h3")`
  margin: 0;
  padding: 0 0 0 var(--space-6);
  
  li {
    margin-bottom: var(--space-2);
    padding-left: var(--space-2);
  }
`;

const Screenshots = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Screenshot = styled("img")`
  width: 100%;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  aspect-ratio: 16/9;
  object-fit: cover;
`;

const DateInfo = styled(Box)`
  display: flex;
  color: var(--color-gray-500);
  font-size: 0.875rem;
  margin-top: var(--space-2);
  
  span {
    margin-right: var(--space-4);
    display: flex;
    align-items: center;
  }
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const { 
    title, 
    description, 
    techStack, 
    liveDemoUrl, 
    githubUrl, 
    features, 
    challenges,
    screenshots,
    createdAt,
    updatedAt
  } = project;
  
  return (
    <Container>
      <Header>
        <div>
          <Title>{title}</Title>
          <DateInfo>
            <span>Created: {formatDate(createdAt)}</span>
            <span>Updated: {formatDate(updatedAt)}</span>
          </DateInfo>
          <TechStack>
            {techStack.map((tech, index) => (
              <TechBadge key={index}>{tech}</TechBadge>
            ))}
          </TechStack>
        </div>
        <ActionButtons>
          <Button 
            variant="outlined"
            endIcon={<Github size={18} />}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Code
          </Button>
          <Button 
            color="primary"
            endIcon={<ExternalLink size={18} />}
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        </ActionButtons>
      </Header>
      
      <Description>{description}</Description>
      
      <Section>
        <SectionTitle>Screenshots</SectionTitle>
        <Screenshots>
          {screenshots.map((screenshot, index) => (
            <Screenshot 
              key={index} 
              src={screenshot} 
              alt={`${title} screenshot ${index + 1}`} 
            />
          ))}
        </Screenshots>
      </Section>
      
      <Section>
        <SectionTitle>Key Features</SectionTitle>
        <List>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Challenges & Solutions</SectionTitle>
        <List>
          {challenges.map((challenge, index) => (
            <li key={index}>{challenge}</li>
          ))}
        </List>
      </Section>
    </Container>
  );
};

export default ProjectDetails;