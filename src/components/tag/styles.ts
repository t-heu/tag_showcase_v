import {createGlobalStyle} from "styled-components"

export const Style = createGlobalStyle`
  .tag {
    width: 314px;
    border: solid 1px #000;
    margin: 3px 2px;
  }
  .tag__description, .tag__cad, .tag__mark, .tag__price {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .tag__description {
    height: 35px;
    font-size: 12px;
    word-wrap: break-word;
    text-align: center;
  }
  .tag__mark {
    background-color: #000000;
    height: 25px;
    font-size: 13px;
    font-family: 'Arial', sans-serif;
    text-align: center;
    color: #eeece1;
    font-weight: bold;
  }
  .tag__price {
    height: 44px;
    font-size: 38px;
    font-weight: bold;
    text-align: center;
  }
  .tag__codebar {
    font-family: 'ccode39';
    font-size: 19px;
    height: 38px;
    width: 314px;
    overflow-y: hidden;
    text-align: center;
  }
  .tag__cad {
    height: 22px;
    font-size: 13px;
    text-align: center;
  }
`