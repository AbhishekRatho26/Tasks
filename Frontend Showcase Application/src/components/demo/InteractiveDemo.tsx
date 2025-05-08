import { useState } from 'react';
import {styled} from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Container = styled(Box)`
  margin: var(--space-10) auto;
  max-width: 800px;
`;

const DemoTitle = styled(Typography)`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: var(--space-6);
  text-align: center;
`;

const DemoDescription = styled(Typography)`
  text-align: center;
  margin-bottom: var(--space-8);
  color: var(--color-gray-700);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ComponentDemo = styled(Box)`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--space-6);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
`;

const ControlPanel = styled(Box)`
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--space-6);
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const DemoButton = styled(Button)<{ customColor?: string }>`
  ${props => props.customColor && `
    background-color: ${props.customColor};
    
    &:hover:not(:disabled) {
      background-color: ${props.customColor}dd;
    }
  `}
`;

const CodeSection = styled(Box)`
  margin-top: var(--space-8);
`;

const CodeHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
`;

const CodeTitle = styled(Typography)`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-900);
`;

const CodeToggle = styled("button")`
  background: none;
  border: none;
  color: var(--color-primary-600);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CodeWrapper = styled(Box)`
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [buttonColor, setButtonColor] = useState('var(--color-primary-600)');
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  
  const toggleCode = () => {
    setShowCode(!showCode);
  };
  
  const changeButtonColor = (color: string) => {
    setButtonColor(color);
  };
  
  const buttonCode = `import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DemoButton = styled.button<{ customColor?: string }>\`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
  padding: 10px 16px;
  font-size: 1rem;
  border: none;
  color: white;
  background-color: \${props => props.customColor || '#6366f1'};
  
  &:hover:not(:disabled) {
    background-color: \${props => props.customColor ? \`\${props.customColor}dd\` : '#4f46e5'};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
\`;

const ModalContainer = styled(motion.div)\`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 24px;
  width: 100%;
  max-width: 400px;
  text-align: center;
\`;

const Demo = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div>
      <DemoButton onClick={toggleModal} customColor="#6366f1">
        Open Modal
      </DemoButton>
      
      <AnimatePresence>
        {isOpen && (
          <div style={{ 
            position: 'fixed', 
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <ModalContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h3>Hello World!</h3>
              <p>This is a simple modal created with styled-components and framer-motion.</p>
              <DemoButton onClick={toggleModal} style={{ marginTop: '16px' }}>
                Close
              </DemoButton>
            </ModalContainer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};`;
  
  return (
    <Container>
      <DemoTitle>Interactive Component Demo</DemoTitle>
      <DemoDescription>
        Explore this custom modal component built with Styled Components and Framer Motion.
        Change the button color and view the source code.
      </DemoDescription>
      
      <ComponentDemo>
        <ControlPanel>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => changeButtonColor('var(--color-primary-600)')}
          >
            Primary
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => changeButtonColor('var(--color-accent-600)')}
          >
            Accent
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => changeButtonColor('var(--color-success-500)')}
          >
            Success
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => changeButtonColor('var(--color-error-500)')}
          >
            Error
          </Button>
        </ControlPanel>
        
        <Button 
         color='primary'
         sx={{background:buttonColor}}
          onClick={toggleModal}
        >
          Open Modal
        </Button>
        
        <AnimatePresence>
          {isOpen && (
            <div style={{ 
              position: 'fixed', 
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000
            }}
            onClick={toggleModal}
            >
              <ModalContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>Hello World!</h3>
                <p style={{ marginBottom: '16px' }}>This is a simple modal created with styled-components and framer-motion.</p>
                <Button 
                  color='primary'
                  onClick={toggleModal}
                  style={{ marginTop: '16px' }}
                >
                  Close
                </Button>
              </ModalContainer>
            </div>
          )}
        </AnimatePresence>
      </ComponentDemo>
      
      <CodeSection>
        <CodeHeader>
          <CodeTitle>Component Code</CodeTitle>
          <CodeToggle onClick={toggleCode}>
            {showCode ? 'Hide Code' : 'Show Code'}
          </CodeToggle>
        </CodeHeader>
        
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CodeWrapper>
                <SyntaxHighlighter
                  language="typescript"
                  style={atomOneDark}
                  showLineNumbers={true}
                  customStyle={{ margin: 0, borderRadius: 'var(--radius-md)' }}
                >
                  {buttonCode}
                </SyntaxHighlighter>
              </CodeWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </CodeSection>
    </Container>
  );
};

export default InteractiveDemo;