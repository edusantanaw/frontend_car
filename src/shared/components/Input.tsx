import React, { forwardRef } from "react";
import { InputStyle } from "../styles/input";

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
}

export const Input = forwardRef<HTMLInputElement, props>((props, ref) => {
  return <InputStyle {...props} ref={ref} />;
});
