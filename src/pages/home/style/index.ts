import styled from "styled-components";

const Header = styled.div`
  padding-bottom: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .actions {
    display: flex;
    gap: 2em;
  }

  @media (max-width: 1050px) {
    flex-direction: column;
    gap: 2em;
  }

  @media (max-width: 620px) {
    .actions {
      flex-direction: column;

      button {
        width: 20em;
      }
    }
  }
`;

export { Header };
