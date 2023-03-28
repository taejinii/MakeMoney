import React from "react";
import styled from "styled-components";
interface ButtonTypes {
  width?: string;
}
const StyledButton = styled.button<ButtonTypes>`
  background-color: #3969fb;
  margin: 0 auto;
  color: white;
  padding: 6px;
  border-radius: 4px;
  font-weight: 600;
  width: ${(props) => props.width || "100%"};
  &:hover {
    background-color: #003eff;
  }
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
