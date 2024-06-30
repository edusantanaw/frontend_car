import React, { forwardRef } from "react";
import styled from "styled-components";

const InputStyle = styled.input<{ width?: string }>`
  width: ${(p) => p?.width ?? "100%"};
  border: none;
  padding: 1.3em 1em;
  border-radius: 5px;
  background-color: #e5e7e5;
  &:focus {
    outline: none;
  }
`;

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export const Input = forwardRef<HTMLInputElement, props>((props, ref) => {
  return <InputStyle {...props} ref={ref} />;
});
