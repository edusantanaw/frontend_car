import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
    }        
`;

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 4em 7em;
  color: #fff;
  background-color: #030211;

  @media (max-width: 1050px) {
    padding: 2em;
}
`;

const Title = styled.h1`
  font-weight: 400;
  color: #ee0571;

`;

export { GlobalStyle, Container, Title };
