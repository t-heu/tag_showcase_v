import styled from "styled-components"

export const Header = styled.header`
  width: 100%;
  padding: .5em;
  display: flex;
  justify-content: space-around;
    
  @media print {
    display: none;
  }
`;
export const ButtonHeader = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
`;
export const Container = styled.header`
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media(max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
    
  @media print {
    grid-template-columns: repeat(2, 1fr);
  }
`;
