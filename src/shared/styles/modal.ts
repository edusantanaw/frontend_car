import styled from "styled-components";

export const ModalContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  z-index: 100;
  .close {
    background-color: #0000007b;
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }
`;
