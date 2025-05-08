import { useState } from 'react';
import styled from 'styled-components';
import { ExternalLink, Github, Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FrontendProject } from '../../utils/types';
import Card from '../common/Card';
// import Button from '../common/Button';
import { Box, Button, Typography } from '@mui/material';


interface ProjectCardProps {
  project: FrontendProject;
  onView: (project: FrontendProject) => void;
  onEdit?: (project: FrontendProject) => void;
  onDelete?: (id: string) => void;
}

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const CardImage = styled(Box)`
  height: 200px;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-color: var(--color-gray-100);
`;

const CardContent = styled(Box)`
  padding: var(--space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 var(--space-2) 0;
  color: var(--color-gray-900);
`;

const CardDescription = styled(Typography)`
  color: var(--color-gray-700);
  margin: 0 0 var(--space-4) 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechStack = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-4) 0;
`;

const TechBadge = styled(Box)`
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
`;

const CardActions = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-4);
`;

const AdminActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-4);
  border-top: 1px solid var(--color-gray-200);
  padding-top: var(--space-4);
`;

const ProjectCard = ({ project, onView, onEdit, onDelete }: ProjectCardProps) => {
  const { id, title, description, techStack, liveDemoUrl, screenshots } = project;
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    initial: {
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate={isHovered ? 'hover' : 'initial'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: '100%' }}
    >
      <StyledCard elevation={isHovered ? 'lg' : 'md'}>
        <CardImage 
          style={{ backgroundImage: `url(${screenshots[0] || ''})` }} 
        />
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          
          <TechStack>
            {techStack.map((tech, index) => (
              <TechBadge key={index}>{tech}</TechBadge>
            ))}
          </TechStack>
          
          <CardActions>
            <Button 
              variant="outlined" 
              size="small" 
              endIcon={<ExternalLink size={16} />}
              href={liveDemoUrl}
            >
              Live Demo
            </Button>
            <Button 
              color="primary" 
              size="small" 
              endIcon={<Eye size={16} />}
              onClick={() => onView(project)}
            >
              View Details
            </Button>
          </CardActions>
          
          {(onEdit || onDelete) && (
            <AdminActions>
              {onEdit && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  endIcon={<Edit size={16} />}
                  onClick={() => onEdit(project)}
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="outlined" 
                  size="small" 
                  endIcon={<Trash2 size={16} />}
                  onClick={() => onDelete(id)}
                  style={{ color: 'var(--color-error-500)' }}
                >
                  Delete
                </Button>
              )}
            </AdminActions>
          )}
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default ProjectCard;