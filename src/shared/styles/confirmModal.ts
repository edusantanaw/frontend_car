import styled from "styled-components";

export const ModalContent = styled.div`
  margin-inline: auto;
  align-self: center;
  width: 25em;
  height: 13em;
  background-color: #262627;
  display: flex;
  flex-direction: column;
  padding: 1em;
  align-items: center;
  justify-content: center;
  gap: 2em;
  border-radius: 10px;
  .actions {
    display: flex;
    gap: 1em;
  }

  p {
    font-size: 1.2em;
  }
`;
