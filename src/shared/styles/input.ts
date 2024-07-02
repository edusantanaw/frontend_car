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

export const InputContainer = styled.div<{ width?: string }>`
  width: ${(p) => p?.width ?? "100%"};
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const Label = styled.label`
  font-weight: 300;
  font-size: 0.9em;
  margin-left: 0.4em;
`;
