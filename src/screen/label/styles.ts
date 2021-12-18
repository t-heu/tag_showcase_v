import {createGlobalStyle} from "styled-components"

export const Style = createGlobalStyle`
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
  html, body {
    height: auto;
  }
  body {
    -webkit-print-color-adjust: exact !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Calibri', sans-serif;
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
  .header {
    width: 100%;
    padding: .5em;
    display: flex;
    justify-content: space-around;
  }
  .header__backhome, .header__print {
    cursor: pointer;
    border: none;
    background-color: #fff;
  }
  @media print {
    .header {
      display: none;
    }
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .container {
    background-color: #fff;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 650px) {
    .container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`