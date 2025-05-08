import { useState, useEffect } from 'react';
import {styled} from '@mui/material/styles';
import { FrontendProject } from '../../utils/types';
// import Button from '../common/Button';
import { X } from 'lucide-react';
import { Box, Button, Typography } from '@mui/material';

interface ProjectFormProps {
  initialValues?: FrontendProject;
  onSubmit: (project: Omit<FrontendProject, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  onCancel: () => void;
}

const Form = styled("form")`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`;

const FormGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
`;

const Label = styled(Typography)`
  font-weight: 500;
  color: var(--color-gray-700);
`;

const Input = styled("input")`
  padding: var(--space-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 2px var(--color-primary-100);
  }
`;

const Textarea = styled("textarea")`
  padding: var(--space-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-md);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--color-primary-400);
    box-shadow: 0 0 0 2px var(--color-primary-100);
  }
`;

const ListItemsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
`;

const ListItem = styled(Box)`
  display: flex;
  align-items: center;
  gap: var(--space-3);
`;

const ListItemInput = styled(Input)`
  flex: 1;
`;

const RemoveButton = styled(Button)`
  background: none;
  border: none;
  color: var(--color-gray-500);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1);
  border-radius: var(--radius-full);
  
  &:hover {
    color: var(--color-error-500);
    background-color: var(--color-gray-100);
  }
`;

const AddButton = styled(Button)`
  align-self: flex-start;
  margin-top: var(--space-2);
`;

const FormActions = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-4);
  margin-top: var(--space-6);
`;

const initialProject: Omit<FrontendProject, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  techStack: [''],
  liveDemoUrl: '',
  githubUrl: '',
  features: [''],
  challenges: [''],
  screenshots: ['']
};

const ProjectForm = ({ initialValues, onSubmit, onCancel }: ProjectFormProps) => {
  const [formValues, setFormValues] = useState<Omit<FrontendProject, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }>(
    initialValues || initialProject
  );
  
  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    }
  }, [initialValues]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleArrayItemChange = (
    field: 'techStack' | 'features' | 'challenges' | 'screenshots', 
    index: number, 
    value: string
  ) => {
    const newArray = [...formValues[field]];
    newArray[index] = value;
    setFormValues(prev => ({ ...prev, [field]: newArray }));
  };
  
  const addArrayItem = (field: 'techStack' | 'features' | 'challenges' | 'screenshots') => {
    setFormValues(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  
  const removeArrayItem = (field: 'techStack' | 'features' | 'challenges' | 'screenshots', index: number) => {
    const newArray = [...formValues[field]];
    newArray.splice(index, 1);
    setFormValues(prev => ({ ...prev, [field]: newArray }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty array items
    const cleanedValues = {
      ...formValues,
      techStack: formValues.techStack.filter(item => item.trim() !== ''),
      features: formValues.features.filter(item => item.trim() !== ''),
      challenges: formValues.challenges.filter(item => item.trim() !== ''),
      screenshots: formValues.screenshots.filter(item => item.trim() !== '')
    };
    
    onSubmit(cleanedValues);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Project Title</Label>
        <Input 
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          placeholder="My Awesome Project"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Description</Label>
        <Textarea 
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          placeholder="A brief description of your project..."
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Tech Stack</Label>
        <ListItemsContainer>
          {formValues.techStack.map((tech, index) => (
            <ListItem key={`tech-${index}`}>
              <ListItemInput 
                value={tech}
                onChange={e => handleArrayItemChange('techStack', index, e.target.value)}
                placeholder="React"
              />
              {formValues.techStack.length > 1 && (
                <RemoveButton 
                  type="button" 
                  onClick={() => removeArrayItem('techStack', index)}
                >
                  <X size={18} />
                </RemoveButton>
              )}
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton 
          type="button" 
          variant="outlined" 
          size="small"
          onClick={() => addArrayItem('techStack')}
        >
          Add Technology
        </AddButton>
      </FormGroup>
      
      <FormGroup>
        <Label >Live Demo URL</Label>
        <Input 
          id="liveDemoUrl"
          name="liveDemoUrl"
          value={formValues.liveDemoUrl}
          onChange={handleChange}
          placeholder="https://myproject.com"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label>GitHub URL</Label>
        <Input 
          id="githubUrl"
          name="githubUrl"
          value={formValues.githubUrl}
          onChange={handleChange}
          placeholder="https://github.com/username/project"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label >Features</Label>
        <ListItemsContainer>
          {formValues.features.map((feature, index) => (
            <ListItem key={`feature-${index}`}>
              <ListItemInput 
                value={feature}
                onChange={e => handleArrayItemChange('features', index, e.target.value)}
                placeholder="Responsive design"
              />
              {formValues.features.length > 1 && (
                <RemoveButton 
                  type="button" 
                  onClick={() => removeArrayItem('features', index)}
                >
                  <X size={18} />
                </RemoveButton>
              )}
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton 
          type="button" 
          variant="outlined" 
          size="small"
          onClick={() => addArrayItem('features')}
        >
          Add Feature
        </AddButton>
      </FormGroup>
      
      <FormGroup>
        <Label >Challenges & Solutions</Label>
        <ListItemsContainer>
          {formValues.challenges.map((challenge, index) => (
            <ListItem key={`challenge-${index}`}>
              <ListItemInput 
                value={challenge}
                onChange={e => handleArrayItemChange('challenges', index, e.target.value)}
                placeholder="Performance optimization"
              />
              {formValues.challenges.length > 1 && (
                <RemoveButton 
                  type="button" 
                  onClick={() => removeArrayItem('challenges', index)}
                >
                  <X size={18} />
                </RemoveButton>
              )}
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton 
          type="button" 
          variant="outlined" 
          size="small"
          onClick={() => addArrayItem('challenges')}
        >
          Add Challenge
        </AddButton>
      </FormGroup>
      
      <FormGroup>
        <Label >Screenshot URLs</Label>
        <ListItemsContainer>
          {formValues.screenshots.map((screenshot, index) => (
            <ListItem key={`screenshot-${index}`}>
              <ListItemInput 
                value={screenshot}
                onChange={e => handleArrayItemChange('screenshots', index, e.target.value)}
                placeholder="https://example.com/screenshot.jpg"
              />
              {formValues.screenshots.length > 1 && (
                <RemoveButton 
                  type="button" 
                  onClick={() => removeArrayItem('screenshots', index)}
                >
                  <X size={18} />
                </RemoveButton>
              )}
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton 
          type="button" 
          variant="outlined" 
          size="small"
          onClick={() => addArrayItem('screenshots')}
        >
          Add Screenshot
        </AddButton>
      </FormGroup>
      
      <FormActions>
        <Button 
          type="button" 
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          color="primary"
        >
          {initialValues ? 'Update Project' : 'Create Project'}
        </Button>
      </FormActions>
    </Form>
  );
};

export default ProjectForm;