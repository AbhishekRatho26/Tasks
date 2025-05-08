import {styled} from '@mui/material/styles';
import { Experience } from '../../utils/types';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const TimelineContainer = styled(Box)`
  position: relative;
  margin: var(--space-10) 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    width: 2px;
    background-color: var(--color-primary-200);
    
    @media (min-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)<{ isEven: boolean }>`
  position: relative;
  margin-bottom: var(--space-12);
  padding-left: 60px;
  
  @media (min-width: 768px) {
    padding-left: ${props => props.isEven ? '0' : '50%'};
    padding-right: ${props => props.isEven ? '50%' : '0'};
    text-align: ${props => props.isEven ? 'right' : 'left'};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TimelineDot = styled(Box)<{ isEven: boolean }>`
  position: absolute;
  left: 16px;
  top: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-primary-500);
  border: 3px solid white;
  box-shadow: 0 0 0 2px var(--color-primary-300);
  z-index: 1;
  
  @media (min-width: 768px) {
    left: ${props => props.isEven ? 'auto' : '50%'};
    right: ${props => props.isEven ? '50%' : 'auto'};
    transform: translateX(${props => props.isEven ? '50%' : '-50%'});
  }
`;

const TimelineContent = styled(Box)<{ isEven: boolean }>`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  
  @media (min-width: 768px) {
    margin-left: ${props => props.isEven ? 'auto' : 'calc(var(--space-8))'};
    margin-right: ${props => props.isEven ? 'calc(var(--space-8))' : 'auto'};
  }
`;

const DateRange = styled(Box)`
  display: inline-block;
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-3);
`;

const Company = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 var(--space-1) 0;
  color: var(--color-gray-900);
`;

const Position = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 var(--space-4) 0;
  color: var(--color-gray-700);
`;

const Description = styled(Typography)`
  color: var(--color-gray-700);
  line-height: 1.6;
  margin-bottom: var(--space-4);
`;

const Technologies = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
`;

const TechBadge = styled(Box)`
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500);
`;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <TimelineContainer>
      {experiences.map((experience, index) => {
        const isEven = index % 2 === 0;
        const { id, company, position, startDate, endDate, description, technologies } = experience;
        
        return (
          <TimelineItem
            key={id}
            isEven={isEven}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TimelineDot isEven={isEven} />
            <TimelineContent isEven={isEven}>
              <DateRange>
                {formatDate(startDate)} - {endDate ? formatDate(endDate) : 'Present'}
              </DateRange>
              <Company>{company}</Company>
              <Position>{position}</Position>
              <Description>{description}</Description>
              <Technologies>
                {technologies.map((tech, i) => (
                  <TechBadge key={i}>{tech}</TechBadge>
                ))}
              </Technologies>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineContainer>
  );
};

export default ExperienceTimeline;