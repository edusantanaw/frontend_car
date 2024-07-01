import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f32d;
  border-top: 4px solid #fffdff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1.6s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { Loading, Spinner };
