import {styled} from '@mui/material/styles';
import { Education } from '../../utils/types';
import Card from '../common/Card';
import { BookOpen } from 'lucide-react';
import { Box, Typography } from '@mui/material';

interface EducationSectionProps {
  education: Education[];
}

const Section = styled(Box)`
  margin-top: var(--space-10);
`;

const Title = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--space-6);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--space-3);
    color: var(--color-primary-600);
  }
`;

const EducationGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EducationCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const Institution = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 var(--space-1) 0;
  color: var(--color-gray-900);
`;

const Degree = styled(Typography)`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0 0 var(--space-1) 0;
  color: var(--color-primary-600);
`;

const Field = styled(Typography)`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 var(--space-4) 0;
  color: var(--color-gray-700);
`;

const DateRange = styled(Box)`
  display: inline-block;
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-4);
`;

const Description = styled(Typography)`
  color: var(--color-gray-700);
  line-height: 1.6;
  font-style: italic;
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const EducationSection = ({ education }: EducationSectionProps) => {
  return (
    <Section>
      <Title>
        <BookOpen size={24} />
        Education
      </Title>
      <EducationGrid>
        {education.map((edu) => (
          <EducationCard key={edu.id}>
            <DateRange>
              {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
            </DateRange>
            <Institution>{edu.institution}</Institution>
            <Degree>{edu.degree}</Degree>
            <Field>{edu.field}</Field>
            {edu.description && <Description>{edu.description}</Description>}
          </EducationCard>
        ))}
      </EducationGrid>
    </Section>
  );
};

export default EducationSection;