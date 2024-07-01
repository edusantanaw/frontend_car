import styled from "styled-components";

const FormStyle = styled.div`
  width: 30em;
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;

  select {
    padding: 1em;
    border: none;
    border-radius: 5px;
    &:focus {
      outline: none;
    }
  }
`;

const ModalContent = styled.div`
  align-self: center;
  margin-inline: auto;
  padding: 1em;
  min-width: 20em;
  min-height: 10em;
  background-color: #1b1a1a;
  margin-inline: auto;
  background-color: #262627;
  padding: 2em 0.5em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 1px #686869be;

  .quest {
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
  }

  .actions {
    display: flex;
    gap: 1em;
  }
  #select_model {
    width: 90%;
    padding: 1em;
  }
`;

export { FormStyle, ModalContent };
