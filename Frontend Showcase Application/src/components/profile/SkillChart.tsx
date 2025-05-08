import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import {styled} from '@mui/material/styles';
import { Skill } from '../../utils/types';
import { Box, Typography } from '@mui/material';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillChartProps {
  skills: Skill[];
}

const ChartContainer = styled(Box)`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-6);
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`;

const Title = styled(Typography)`
  text-align: center;
  margin-bottom: var(--space-6);
  font-size: 1.5rem;
  color: var(--color-gray-800);
`;

const SkillList = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
  justify-content: center;
`;

const SkillBadge = styled(Box)<{ color: string }>`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  background-color: ${props => props.color}20;
  border: 1px solid ${props => props.color};
  
  .skill-name {
    font-weight: 500;
    color: var(--color-gray-800);
  }
  
  .skill-level {
    font-weight: 600;
    color: ${props => props.color};
  }
`;

const SkillChart = ({ skills }: SkillChartProps) => {
  const data = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Skill Level',
        data: skills.map(skill => skill.level),
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: skills.map(skill => skill.color),
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };
  
  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        pointLabels: {
          font: {
            size: 14,
            family: 'var(--font-sans)',
          },
        },
      },
    },
  };
  
  return (
    <ChartContainer>
      <Title>Skills Proficiency</Title>
      <Radar data={data} options={options} />
      <SkillList>
        {skills.map((skill, index) => (
          <SkillBadge key={index} color={skill.color}>
            <span className="skill-name">{skill.name}</span>
            <span className="skill-level">{skill.level}%</span>
          </SkillBadge>
        ))}
      </SkillList>
    </ChartContainer>
  );
};

export default SkillChart;