import {styled} from '@mui/material/styles';
import InteractiveDemo from '../components/demo/InteractiveDemo';
import { Box, Typography } from '@mui/material';

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
`;

const Subtitle = styled(Typography)`
  font-size: 1.25rem;
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto;
`;

const Demo = () => {
  return (
    <Container className="container">
      <Header>
        <Title>Interactive Component Demo</Title>
        <Subtitle>
          Explore custom-built components with code snippets and live examples
        </Subtitle>
      </Header>
      
      <InteractiveDemo />
    </Container>
  );
};

export default Demo;