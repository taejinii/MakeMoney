import styled from "styled-components";
import SideBarItems from "./SideBarItems";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import React from "react";
const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 100vh;
  background-color: #f8f9fa;
`;
const ProfileWrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 30%;
`;
const SideBarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: 70%;
`;
export default function SideBar() {
  return (
    <SideBarContainer>
      <ProfileWrapper>
        <Link to={"/"} className="font-bold text-xl">
          MakeMoney
        </Link>
        <Profile />
      </ProfileWrapper>
      <SideBarMenu>
        <SideBarItems />
      </SideBarMenu>
    </SideBarContainer>
  );
}
