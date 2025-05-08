import { useState } from 'react';
import {styled} from '@mui/material/styles';
import { X } from 'lucide-react';
import { Box, Button, Typography } from '@mui/material';
import { Profile, Skill, Experience, Education } from '../../utils/types';

interface ProfileFormProps {
  initialValues: Profile;
  onSubmit: (profile: Profile) => void;
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

const Section = styled(Box)`
  border-top: 1px solid var(--color-gray-200);
  padding-top: var(--space-6);
  margin-top: var(--space-6);
`;

const SectionTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-800);
  margin-bottom: var(--space-4);
`;

const ListItemsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const ListItem = styled(Box)`
  display: flex;
  gap: var(--space-3);
  align-items: start;
`;

const ItemFields = styled(Box)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
`;

const RemoveButton = styled(Button)`
  background: none;
  border: none;
  color: var(--color-gray-500);
  cursor: pointer;
  padding: var(--space-1);
  display: flex;
  align-items: center;
  justify-content: center;
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

const ProfileForm = ({ initialValues, onSubmit, onCancel }: ProfileFormProps) => {
  const [formValues, setFormValues] = useState<Profile>(initialValues);
  
  const handleChange = (
    section: keyof Profile['info'], 
    field: string, 
    value: string
  ) => {
    setFormValues(prev => ({
      ...prev,
      info: {
        ...prev.info,
        [section]: typeof prev.info[section] === 'object'
          ? { ...prev.info[section], [field]: value }
          : value
      }
    }));
  };
  
  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...formValues.skills];
    newSkills[index] = {
      ...newSkills[index],
      [field]: field === 'level' ? Number(value) : value
    };
    setFormValues(prev => ({ ...prev, skills: newSkills }));
  };
  
  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...formValues.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormValues(prev => ({ ...prev, experience: newExperience }));
  };
  
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formValues.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormValues(prev => ({ ...prev, education: newEducation }));
  };
  
  const addSkill = () => {
    setFormValues(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 0, color: '#000000' }]
    }));
  };
  
  const addExperience = () => {
    setFormValues(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id: Date.now().toString(),
        company: '',
        position: '',
        startDate: '',
        endDate: null,
        description: '',
        technologies: []
      }]
    }));
  };
  
  const addEducation = () => {
    setFormValues(prev => ({
      ...prev,
      education: [...prev.education, {
        id: Date.now().toString(),
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: null,
        description: ''
      }]
    }));
  };
  
  const removeSkill = (index: number) => {
    setFormValues(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };
  
  const removeExperience = (index: number) => {
    setFormValues(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };
  
  const removeEducation = (index: number) => {
    setFormValues(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          value={formValues.info.name}
          onChange={(e) => handleChange('name', '', e.target.value)}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Title</Label>
        <Input
          value={formValues.info.title}
          onChange={(e) => handleChange('title', '', e.target.value)}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Avatar URL</Label>
        <Input
          value={formValues.info.avatar}
          onChange={(e) => handleChange('avatar', '', e.target.value)}
        />
      </FormGroup>
      
      <FormGroup>
        <Label>About</Label>
        <Textarea
          value={formValues.info.about}
          onChange={(e) => handleChange('about', '', e.target.value)}
        />
      </FormGroup>
      
      <Section>
        <SectionTitle>Contact Information</SectionTitle>
        <FormGroup>
          <Label>Email</Label>
          <Input
            value={formValues.info.contact.email}
            onChange={(e) => handleChange('contact', 'email', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>LinkedIn</Label>
          <Input
            value={formValues.info.contact.linkedin}
            onChange={(e) => handleChange('contact', 'linkedin', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>GitHub</Label>
          <Input
            value={formValues.info.contact.github}
            onChange={(e) => handleChange('contact', 'github', e.target.value)}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Website</Label>
          <Input
            value={formValues.info.contact.website}
            onChange={(e) => handleChange('contact', 'website', e.target.value)}
          />
        </FormGroup>
      </Section>
      
      <Section>
        <SectionTitle>Skills</SectionTitle>
        <ListItemsContainer>
          {formValues.skills.map((skill, index) => (
            <ListItem key={index}>
              <ItemFields>
                <Input
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                />
                <Input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Skill level"
                  value={skill.level}
                  onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                />
                <Input
                  type="color"
                  value={skill.color}
                  onChange={(e) => handleSkillChange(index, 'color', e.target.value)}
                />
              </ItemFields>
              <RemoveButton type="button" onClick={() => removeSkill(index)}>
                <X size={18} />
              </RemoveButton>
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton
          type="button"
          variant='outlined'
          size="small"
          onClick={addSkill}
        >
          Add Skill
        </AddButton>
      </Section>
      
      <Section>
        <SectionTitle>Experience</SectionTitle>
        <ListItemsContainer>
          {formValues.experience.map((exp, index) => (
            <ListItem key={exp.id}>
              <ItemFields>
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <Input
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                />
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                />
                <Input
                  type="month"
                  value={exp.endDate || ''}
                  onChange={(e:any) => handleExperienceChange(index, 'endDate', e.target.value || null)}
                />
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  style={{ gridColumn: '1 / -1' }}
                />
              </ItemFields>
              <RemoveButton type="button" onClick={() => removeExperience(index)}>
                <X size={18} />
              </RemoveButton>
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton
          type="button"
          variant='outlined'
          size="small"
          onClick={addExperience}
        >
          Add Experience
        </AddButton>
      </Section>
      
      <Section>
        <SectionTitle>Education</SectionTitle>
        <ListItemsContainer>
          {formValues.education.map((edu, index) => (
            <ListItem key={edu.id}>
              <ItemFields>
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                />
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                />
                <Input
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                />
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                />
                <Input
                  type="month"
                  value={edu.endDate || ''}
                  onChange={(e:any) => handleEducationChange(index, 'endDate', e.target.value || null)}
                />
                <Textarea
                  placeholder="Description"
                  value={edu.description}
                  onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                  style={{ gridColumn: '1 / -1' }}
                />
              </ItemFields>
              <RemoveButton type="button" onClick={() => removeEducation(index)}>
                <X size={18} />
              </RemoveButton>
            </ListItem>
          ))}
        </ListItemsContainer>
        <AddButton
          type="button"
          variant="outlined"
          size="small"
          onClick={addEducation}
        >
          Add Education
        </AddButton>
      </Section>
      
      <FormActions>
        <Button type="button" variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Save Changes
        </Button>
      </FormActions>
    </Form>
  );
};

export default ProfileForm;