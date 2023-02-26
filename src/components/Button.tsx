import styled from "styled-components";
interface ButtonTypes {
  width?: string;
}
const StyledButton = styled.button<ButtonTypes>`
  background-color: #3969fb;
  color: white;
  padding: 6px;
  border-radius: 4px;
  font-weight: 600;
  width: ${(props) => props.width || "100%"};
  &:hover {
    background-color: #003eff;
  }
`;

export default function Button({ children, ...props }: any) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
