import styled, {createGlobalStyle} from "styled-components"

export const Style = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    background-color: #2c5396;
    justify-content: center;
    padding: 0 32px;
  }
`;
export const Main = styled.div`
  display: block; 
  width: 450px;

  @media(max-width: 500px) {
    width: 100%;
  }
`;
export const Form = styled.form`
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  background: #fff;
  padding: 19px;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
`;
export const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
`;
export const BoxButtons = styled.div`
  position: absolute;
  z-index: 999;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Button = styled.a`
  border: none;
  height: 45px;
  width: 45px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdd63a;
  color: #1C1C1C;
  border-radius: 2px;
  margin-right: 8px;
  font-size: inherit;
  line-height: inherit;

  :hover {
    background: #2c5396;
    color: #fff;
  }
`;
export const TextInput = styled.span`
  overflow-x: scroll;
  width: 100%;
  color: #000;
  white-space: nowrap;
  cursor: pointer;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Header = styled.header`
  text-align: center;
`;
export const Footer = styled.footer`
  text-align: center;
`;
export const Text = styled.small`
  color: #e5e5e5;
`;