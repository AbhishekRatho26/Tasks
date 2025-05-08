// import styled, { css } from 'styled-components';
// import { ReactNode } from 'react';
// import { Button } from '@mui/material';
// type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
// type ButtonSize = 'sm' | 'md' | 'lg';

// interface ButtonProps {
//   children: ReactNode;
//   variant?: ButtonVariant;
//   size?: ButtonSize;
//   fullWidth?: boolean;
//   icon?: ReactNode;
//   iconPosition?: 'left' | 'right';
//   disabled?: boolean;
//   onClick?: () => void;
//   type?: 'button' | 'submit' | 'reset';
//   className?: string;
//   as?: any;
//   to?: string;
// }

// const ButtonStyles = styled(Button)<{
//   variant: ButtonVariant;
//   size: ButtonSize;
//   fullWidth: boolean;
//   hasIcon: boolean;
//   iconPosition: 'left' | 'right';
// }>`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: 500;
//   border-radius: var(--radius-md);
//   transition: all 0.2s ease;
//   white-space: nowrap;
//   cursor: pointer;
  
//   ${({ fullWidth }) => fullWidth && css`
//     width: 100%;
//   `}
  
//   ${({ size }) => {
//     switch (size) {
//       case 'sm':
//         return css`
//           padding: var(--space-1) var(--space-3);
//           font-size: 0.875rem;
//         `;
//       case 'lg':
//         return css`
//           padding: var(--space-3) var(--space-6);
//           font-size: 1.125rem;
//         `;
//       default:
//         return css`
//           padding: var(--space-2) var(--space-4);
//           font-size: 1rem;
//         `;
//     }
//   }}
  
//   ${({ variant }) => {
//     switch (variant) {
//       case 'secondary':
//         return css`
//           background-color: var(--color-accent-500);
//           color: white;
//           border: none;
          
//           &:hover:not(:disabled) {
//             background-color: var(--color-accent-600);
//           }
          
//           &:active:not(:disabled) {
//             background-color: var(--color-accent-700);
//           }
//         `;
//       case 'outline':
//         return css`
//           background-color: transparent;
//           color: var(--color-primary-600);
//           border: 1px solid var(--color-primary-300);
          
//           &:hover:not(:disabled) {
//             background-color: var(--color-primary-50);
//           }
          
//           &:active:not(:disabled) {
//             background-color: var(--color-primary-100);
//           }
//         `;
//       case 'text':
//         return css`
//           background-color: transparent;
//           color: var(--color-primary-600);
//           border: none;
//           padding-left: var(--space-2);
//           padding-right: var(--space-2);
          
//           &:hover:not(:disabled) {
//             background-color: var(--color-primary-50);
//           }
          
//           &:active:not(:disabled) {
//             background-color: var(--color-primary-100);
//           }
//         `;
//       default:
//         return css`
//           background-color: var(--color-primary-600);
//           color: white;
//           border: none;
          
//           &:hover:not(:disabled) {
//             background-color: var(--color-primary-700);
//           }
          
//           &:active:not(:disabled) {
//             background-color: var(--color-primary-800);
//           }
//         `;
//     }
//   }}
  
//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
  
//   ${({ hasIcon, iconPosition }) => hasIcon && css`
//     .icon {
//       display: inline-flex;
//       align-items: center;
      
//       ${iconPosition === 'left' ? css`
//         margin-right: var(--space-2);
//       ` : css`
//         margin-left: var(--space-2);
//       `}
//     }
//   `}
// `;

// const Button = ({
//   children,
//   variant = 'primary',
//   size = 'md',
//   fullWidth = false,
//   icon,
//   iconPosition = 'left',
//   disabled = false,
//   onClick,
//   type = 'button',
//   className,
//   as,
//   to,
//   ...props
// }: ButtonProps) => {
//   return (
//     <ButtonStyles
//       variant={variant}
//       size={size}
//       fullWidth={fullWidth}
//       hasIcon={!!icon}
//       iconPosition={iconPosition}
//       disabled={disabled}
//       onClick={onClick}
//       type={type}
//       className={className}
//       as={as}
//       to={to}
//       {...props}
//     >
//       {icon && iconPosition === 'left' && <span className="icon">{icon}</span>}
//       {children}
//       {icon && iconPosition === 'right' && <span className="icon">{icon}</span>}
//     </ButtonStyles>
//   );
// };

// export default Button;