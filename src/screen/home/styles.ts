import {createGlobalStyle} from "styled-components"

export const Style = createGlobalStyle`
* {
    margin: 0;
    outline: 0;
  }
  html, body {
    height: 100%;
  }
  body {
    padding: 0 32px;
    line-height: 1.5;
    font-size: 1rem;
    background-color: #2c5396;/*#125899;*/
    font-family: "Arial", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
  .file-input {
    display: block; 
    width: 450px;
  }
  .file-input__form {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    background: #fff;
    padding: 16px;
    position: relative;
    cursor: pointer;
    border-radius: 3px;
  }

  @media only screen and (max-width: 500px) {
    .file-input, .instructions {
      width: 100%;
    }
  }

  .file-input__form > [type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
  }

  .file-input__form > .file-input__button--download {
    right: 0;
    margin-right: 100px;
    z-index: 99;
    position: absolute;
    color: #fdd63a;
  }

  .file-input__form > .file-input__button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 45px;
    width: 45px;
    position: absolute;
    z-index: 999;
    right: 0;
    font-weight: bold;
    cursor: pointer;
    background: #fdd63a;/*#ebd04c;*/
    color: #1C1C1C;
    border-radius: 2px;
    margin-right: 8px;
    font-size: inherit;
    line-height: inherit;
  }

  .file-input__button + .download {
    margin-right: 60px;
  }

  .file-input__button:hover {
    background: #2c5396/*#125899*/;
    color: #fff;
  }

  .file-input__form > .file-input__text {
    overflow-x: scroll;
    width: 100%;
    color: #000;
    white-space: nowrap;
    /*opacity: .3;*/
    cursor: pointer;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  .file-input__form > .file-input__text::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .file-input__form > .file-input__text {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .footer {
    margin-top: 1em;
  }

  .footer__text, .obs {
    color: #e5e5e5;
    text-align: center;
    margin-bottom: 10px;
  }
`