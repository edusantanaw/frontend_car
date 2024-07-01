import styled from "styled-components";

const ItemHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2em;
  letter-spacing: 1px;
  .action {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .icon {
    font-size: 1.1em;
    cursor: pointer;
  }

  h2 {
    font-weight: 400;
    span {
      color: #ee0571;
      font-weight: 500;
    }
  }
`;

const ModalContent = styled.div`
  width: 18em;
  min-height: 28vh;
  align-self: center;
  margin-inline: auto;
  background-color: #262627;
  padding: 2em 0.5em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 5px 1px #686869be;
  #error {
    color: #f70505;
  }
`;

export { ItemHeader, ModalContent };
