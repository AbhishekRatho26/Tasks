import { useState } from 'react';
import styled from 'styled-components';
import { Search, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { FrontendProject } from '../utils/types';
import { projectsData } from '../data/projectsData';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectDetails from '../components/projects/ProjectDetails';
import ProjectForm from '../components/projects/ProjectForm';
import Modal from '../components/common/Modal';
import { Box, Grid, Typography } from '@mui/material';

const Container = styled(Box)`
  margin: var(--space-10) 0;
`;

const Header = styled(Box)`
  margin-bottom: var(--space-10);
  text-align: center;
`;

const Title = styled(Typography)`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--space-4);
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(Typography)`
  font-size: 1.25rem;
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
`;

const SearchContainer = styled(Box)`
  position: relative;
  max-width: 500px;
  margin: var(--space-10) auto;
`;

const SearchInput = styled("input")`
  width: 100%;
  padding: var(--space-4);
  padding-left: var(--space-12);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  font-size: 1rem;
  box-shadow: var(--shadow-sm);
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 3px var(--color-primary-100);
  }
`;

const SearchIcon = styled(Box)`
  position: absolute;
  left: var(--space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectGrid = styled(Grid)`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NoResults = styled(Box)`
  text-align: center;
  padding: var(--space-16) 0;
  color: var(--color-gray-600);
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: var(--space-3);
  }
  
  p {
    font-size: 1.125rem;
  }
`;

const Home = () => {
  const [projects, setProjects] = useState<FrontendProject[]>(projectsData);
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<FrontendProject | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  const filteredProjects = projects.filter(project => {
    const searchTerm = search.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchTerm))
    );
  });
  
  const handleViewProject = (project: FrontendProject) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const handleEditProject = (project: FrontendProject) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateProject = (updatedProject: FrontendProject) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    setIsEditModalOpen(false);
  };
  
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      y: 20,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <Container className="container">
      <Header>
        <Title>Frontend Projects Showcase</Title>
        
      </Header>
      
      <SearchContainer>
        <SearchInput 
          placeholder="Search projects by title, description, or technology..."
          value={search}
          onChange={handleSearchChange}
          spellCheck={false}
        />
        <SearchIcon>
          <Search size={20} />
        </SearchIcon>
      </SearchContainer>
      
      {filteredProjects.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ProjectGrid>
            {filteredProjects.map(project => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard 
                  project={project} 
                  onView={handleViewProject}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                />
              </motion.div>
            ))}
          </ProjectGrid>
        </motion.div>
      ) : (
        <NoResults>
          <h3>No projects found</h3>
          <p>Try adjusting your search criteria</p>
        </NoResults>
      )}
      
      {selectedProject && (
        <>
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title="Project Details"
            size="lg"
          >
            <ProjectDetails project={selectedProject} />
          </Modal>

          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="Edit Project"
            size="lg"
          >
            <ProjectForm 
              initialValues={selectedProject}
              onSubmit={handleUpdateProject}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Home;