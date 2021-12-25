import styled from "styled-components"

export const Header = styled.header`
  width: 100%;
  padding: .5em;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  color: var(--color-principal3);
    
  @media print {
    display: none;
  }
`;
export const ButtonHeader = styled.button`
  cursor: pointer;
  border: none;
  background: none;
`;
export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media(max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
    
  @media print {
    grid-template-columns: repeat(2, 1fr);
  }
`;
