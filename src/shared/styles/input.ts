import styled from "styled-components";

export const InputStyle = styled.input<{ width?: string }>`
  width: ${(p) => p?.width ?? "100%"};
  border: none;
  padding: 1.3em 1em;
  border-radius: 5px;
  background-color: #e5e7e5;
  &:focus {
    outline: none;
  }
`;
