import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Edit } from 'lucide-react';
import { FrontendProject } from '../utils/types';
import { projectsData } from '../data/projectsData';
import ProjectDetails from '../components/projects/ProjectDetails';
import { Box, Button } from '@mui/material';
import Modal from '../components/common/Modal';
import ProjectForm from '../components/projects/ProjectForm';

const Container = styled(Box)`
  margin: var(--space-10) 0;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
`;

const BackButton = styled(Button)`
  display: flex;
  align-items: center;
`;

const ProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<FrontendProject | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundProject = projectsData.find(p => p.id === id);
      setProject(foundProject || null);
    }
  }, [id]);
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };
  
  const handleUpdateProject = (updatedProject: FrontendProject) => {
    // In a real app, this would be an API call
    const projectIndex = projectsData.findIndex(p => p.id === id);
    
    if (projectIndex !== -1) {
      const updatedData = {
        ...updatedProject,
        updatedAt: new Date().toISOString()
      };
      
      projectsData[projectIndex] = updatedData;
      setProject(updatedData);
      setIsEditModalOpen(false);
    }
  };
  
  if (!project) {
    return (
      <Container className="container">
        <div>Project not found</div>
      </Container>
    );
  }
  
  return (
    <Container className="container">
      <Header>
        <BackButton 
          variant="outlined" 
          endIcon={<ArrowLeft size={18} />}
          onClick={handleBack}
        >
          Back to Projects
        </BackButton>
        
        <Button 
          color="primary" 
          endIcon={<Edit size={18} />}
          onClick={handleEditClick}
        >
          Edit Project
        </Button>
      </Header>
      
      <ProjectDetails project={project} />
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        title="Edit Project"
        size="lg"
      >
        <ProjectForm 
          initialValues={project}
          onSubmit={handleUpdateProject}
          onCancel={handleCloseModal}
        />
      </Modal>
    </Container>
  );
};

export default ProjectDetailsPage;