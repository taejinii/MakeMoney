import styled, { keyframes } from "styled-components";
import React from "react";
const rotation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
const isDark = localStorage.getItem("theme") === "dark";
const Spinner = styled.span`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  top: 50%;
  width: 96px;
  height: 96px;
  border: 5px solid ${isDark ? "#fff" : "#000000"};
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

export default function LoadingSpinner() {
  return <Spinner></Spinner>;
}
