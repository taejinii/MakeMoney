import styled from "styled-components";
interface ButtonTypes {
  width?: string;
}
const StyledButton = styled.button<ButtonTypes>`
  background-color: #003eff;
  color: white;
  padding: 8px;
  border-radius: 4px;
  width: ${(props) => props.width || "100%"};
`;

export default function Button({ children, ...props }: any) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
