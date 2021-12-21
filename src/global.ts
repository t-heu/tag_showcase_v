import {createGlobalStyle} from "styled-components"

export const Style = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  :root {
    --color-principal: #2c5396;
    --color-principal2: #fdd63a;
  }

  @page {
    margin: 10mm auto 13.8mm auto; /*0.45in auto;*/
  }
  * {
    margin: 0;
    outline: 0;
  }
  a {
    text-decoration: none;
  }
  html, body, #root {
    height: auto;
  }
  body {
    -webkit-print-color-adjust: exact !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*font-family: 'Calibri', sans-serif;*/
    font: 400 16px Calibri, Roboto, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items:center;
  }
  @font-face {
    font-family:'ccode39';
    src: url('fonts/ConnectCode39.ttf');
    font-weight:normal;
    font-style:normal;
  }
`;
