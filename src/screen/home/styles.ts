import styled, {createGlobalStyle} from "styled-components"

export const Style = createGlobalStyle`
  html, body {
    height: 100% !important;
  }
  body {
    background-color: var(--color-principal);
    justify-content: center;
    padding: 0 32px;
  }
`;
export const Main = styled.main`
  display: block; 
  width: 450px;

  @media(max-width: 500px) {
    width: 100%;
  }
`;
export const Form = styled.form`
  display: flex;
  align-items: center;
  text-align: left;
  background: var(--color-white);;
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
  background: var(--color-principal2);
  color: var(--color-principal3);
  border-radius: 2px;
  margin-right: 8px;
  font-size: inherit;
  line-height: inherit;

  :hover {
    background: var(--color-principal);
    color: var(--color-white);
  }
`;
export const TextInput = styled.span`
  width: 310px;
  text-align: left;
  font-size: 16px;
  color: var(--color-principal3);
  white-space: nowrap;
  cursor: pointer;
  overflow-x: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  @media(max-width: 500px) {
    width: 280px;
  }
`;
export const Header = styled.header`
  margin-top: 1em;
  text-align: center;
`;
export const Footer = styled.footer`
  margin-bottom: 1em;
  text-align: center;
`;
export const Text = styled.small`
  color: var(--color-principal4);
  font-size: 14px;
`;
export const Modal = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 450px;
  position: absolute;
  bottom: 0;
  right: 0;

  @media(max-width: 500px) {
    width: 100%;
  }
`;
