import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div<{
  $diameter?: number;
  $frontgroundColor?: string;
  $backgroundColor?: string;
  $strokeWidth?: number;
}>`
  width: ${(p) => p.$diameter ?? 16}px;
  height: ${(p) => p.$diameter ?? 16}px;
  border: ${(p) => p.$strokeWidth ?? 4}px solid
    ${(p) => p.$frontgroundColor ?? '#000'};
  border-top-color: ${(p) => p.$backgroundColor ?? '#F2F4F8'};
  border-right-color: ${(p) => p.$backgroundColor ?? '#F2F4F8'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
