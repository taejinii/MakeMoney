import styled from "styled-components";
import SideBarItems from "./SideBarItems";
import Profile from "./Profile";
import { Link } from "react-router-dom";
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
  height: 20%;
`;
const SideBarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: 80%;
`;
export default function SideBar() {
  return (
    <SideBarContainer>
      <ProfileWrapper>
        <Link to={"/"}>Logo</Link>
        <Profile />
      </ProfileWrapper>
      <SideBarMenu>
        <SideBarItems />
      </SideBarMenu>
    </SideBarContainer>
  );
}
