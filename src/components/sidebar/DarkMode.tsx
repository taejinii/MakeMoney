import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
interface DarkModeType {
  isDark: boolean;
}
const DarkModeCircle = styled.input<DarkModeType>`
  outline: none;
  appearance: none;
`;
const DarkModeLabel = styled.label<DarkModeType>`
  width: 80px;
  height: 30px;
  position: relative;
  display: block;
  background: #ebebeb;
  border-radius: 200px;
  box-shadow: inset 0px 5px 15px rgba(0, 0, 0, 0.4),
    inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.3s;
  &::after {
    content: "";
    width: 25px;
    height: 25px;
    position: absolute;
    top: 2px;
    left: ${(props) => (props.isDark ? "53px" : "3px")};
    background: ${(props) =>
      props.isDark
        ? "linear-gradient(180deg, #777, #3a3a3a)"
        : "linear-gradient(180deg, #ffcc89, #d8860b)"};
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);

  const darkModeHandler = () => {
    setIsDark(!isDark);
  };
  const darkmode = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);
  return (
    <div className="">
      DarkMode
      <DarkModeCircle
        id="darkmode"
        type="checkbox"
        onClick={darkmode}
        onChange={darkModeHandler}
        isDark={isDark}
      />
      <DarkModeLabel isDark={isDark} htmlFor="darkmode">
        <BsFillSunFill
          className={`z-10 absolute left-[7px] top-[7px] ${
            isDark ? "fill-[#7e7e7e]" : "fill-[#fff] "
          }`}
        />
        <BsFillMoonStarsFill
          className={`z-10 absolute left-[57px] top-[7px] ${
            isDark ? "fill-[#fff]" : "fill-[#7e7e7e] "
          }`}
        />
      </DarkModeLabel>
    </div>
  );
}
