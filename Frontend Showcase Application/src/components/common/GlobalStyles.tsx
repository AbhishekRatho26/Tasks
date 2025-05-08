import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Base styles already in index.css */
  
  /* Additional global styles */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-4);
  }
  
  @media (min-width: 640px) {
    .container {
      padding: 0 var(--space-6);
    }
  }
  
  @media (min-width: 1024px) {
    .container {
      padding: 0 var(--space-8);
    }
  }
  
  section {
    margin: var(--space-12) 0;
  }
  
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

export default GlobalStyles;