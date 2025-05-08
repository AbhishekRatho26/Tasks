import { Box } from '@mui/material';
import {styled} from '@mui/material/styles';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: 'sm' | 'md' | 'lg';
  padding?: boolean;
}

const StyledCard = styled(Box)<{
  elevation: 'sm' | 'md' | 'lg';
  padding: boolean;
}>`
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  ${({ padding }) => padding && `
    padding: var(--space-6);
    
    @media (min-width: 640px) {
      padding: var(--space-8);
    }
  `}
  
  ${({ elevation }) => {
    switch (elevation) {
      case 'sm':
        return `box-shadow: var(--shadow-sm);`;
      case 'lg':
        return `box-shadow: var(--shadow-lg);`;
      default:
        return `box-shadow: var(--shadow-md);`;
    }
  }}
  
  &:hover {
    ${({ elevation }) => {
      switch (elevation) {
        case 'sm':
          return `box-shadow: var(--shadow-md);`;
        case 'md':
          return `box-shadow: var(--shadow-lg);`;
        case 'lg':
          return `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);`;
      }
    }}
  }
`;

const Card = ({ 
  children, 
  className, 
  elevation = 'md',
  padding = true,
  ...props 
}: CardProps) => {
  return (
    <StyledCard 
      className={className} 
      elevation={elevation}
      padding={padding}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;