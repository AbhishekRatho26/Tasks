import {styled} from "@mui/material/styles"
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';
import { FrontendProject } from '../utils/types';
import { projectsData } from '../data/projectsData';
import ProjectForm from '../components/projects/ProjectForm';
import { Box, Typography } from '@mui/material';

const Container = styled(Box)`
  margin: var(--space-10) 0;
`;

const Header = styled(Box)`
  margin-bottom: var(--space-8);
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--space-3);
    color: var(--color-primary-600);
  }
`;

const Description = styled(Typography)`
  color: var(--color-gray-600);
`;

const FormContainer = styled(Box)`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
`;

const AddProject = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (
    project: Omit<FrontendProject, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    
    const newProject: FrontendProject = {
      ...project,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    projectsData.unshift(newProject);
    
    
    navigate('/');
  };
  
  const handleCancel = () => {
    navigate('/');
  };
  
  return (
    <Container className="container">
      <Header>
        <Title>
          <Plus size={24} />
          Add New Project
        </Title>
        <Description>Showcase your frontend skills with a new project</Description>
      </Header>
      
      <FormContainer>
        <ProjectForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </FormContainer>
    </Container>
  );
};

export default AddProject;