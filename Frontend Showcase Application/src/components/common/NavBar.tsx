import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {styled} from '@mui/material/styles';
import { Menu, X, Code, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import Button from './Button';
import {Button} from '@mui/material';
import { Box } from '@mui/material';

const Nav = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-gray-200);
`;

const NavContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 1024px) {
    padding: var(--space-4) var(--space-8);
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--color-primary-700);
  
  svg {
    margin-right: var(--space-2);
  }
`;

const DesktopMenu = styled(Box)`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }
`;

const MobileMenuButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-gray-700);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 110;
  display: flex;
  justify-content: flex-end;
`;

const MobileMenuContent = styled(motion.div)`
  background-color: white;
  width: 80%;
  max-width: 300px;
  height: 100%;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
`;

const MobileMenuLinks = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-gray-700);
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
  
  &:hover, &.active {
    color: var(--color-primary-600);
  }
  
  &.active:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--color-primary-600);
    border-radius: 1px;
  }
`;

const MobileNavLink = styled(StyledNavLink)`
  padding: var(--space-2) 0;
  font-size: 1.125rem;
  
  &.active:after {
    display: none;
  }
`;

const ActionButtons = styled(Box)`
  display: flex;
  gap: var(--space-3);
  margin-left: var(--space-4);
`;

const MobileActionButtons = styled(ActionButtons)`
  margin-top: var(--space-6);
  flex-direction: column;
`;

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <Code size={24} />
          <span>Devfolio</span>
        </Logo>
        
        <DesktopMenu>
          <StyledNavLink to="/">Projects</StyledNavLink>
          <StyledNavLink to="/profile">Profile</StyledNavLink>
          <StyledNavLink to="/demo">Interactive Demo</StyledNavLink>
          
          <ActionButtons>
            <Button 
              variant="outlined" 
              size="small" 
              endIcon={<Monitor size={16} />}
              href="/add-project"
            >
              Add Project
            </Button>
          </ActionButtons>
        </DesktopMenu>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <Menu size={24} />
        </MobileMenuButton>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenuOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            >
              <MobileMenuContent
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                onClick={(e) => e.stopPropagation()}
              >
                <MobileMenuHeader>
                  <Logo to="/" onClick={closeMobileMenu}>
                    <Code size={24} />
                    <span>DevShowcase</span>
                  </Logo>
                  <MobileMenuButton onClick={closeMobileMenu}>
                    <X size={24} />
                  </MobileMenuButton>
                </MobileMenuHeader>
                
                <MobileMenuLinks>
                  <MobileNavLink to="/" onClick={closeMobileMenu}>
                    Projects
                  </MobileNavLink>
                  <MobileNavLink to="/profile" onClick={closeMobileMenu}>
                    Profile
                  </MobileNavLink>
                  <MobileNavLink to="/demo" onClick={closeMobileMenu}>
                    Interactive Demo
                  </MobileNavLink>
                </MobileMenuLinks>
                
                <MobileActionButtons>
                  <Button></Button>
                  <Button 
                    color="primary" 
                    fullWidth
                    endIcon={<Monitor size={18} />}
                    href="/add-project"
                    onClick={closeMobileMenu}
                  >
                    Add Project
                  </Button>
                </MobileActionButtons>
              </MobileMenuContent>
            </MobileMenuOverlay>
          )}
        </AnimatePresence>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;