import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin:0; 
    padding:0;
    width:100vw;
    height:100vh;
    background-color: #EDF2F7;
    display:flex;
    align-items:center;
    justify-content:center;
    
  }
`;

export const fontWithPoppins = css`
  font-family: Poppins;
`;

export const contentCentered = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
