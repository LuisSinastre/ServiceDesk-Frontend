import React from "react";
import { StyledInputText } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  disabled = false,
  required = false,
  ...rest
}: InputProps) => {
  return (
    <StyledInputText
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      required={required}
      {...rest} // Aqui, você espalha as outras propriedades de input
    />
  );
};
