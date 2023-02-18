import styled from "styled-components";
import SideBarItems from "./SideBarItems";

const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 200px;
  height: 100vh;
`;
const ProfileWrapper = styled.header`
  display: flex;
  border: 1px solid black;
  background-color: red;
  height: 20%;
`;
const SideBarMenu = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: blue;
  height: 100%;
`;
export default function SideBar() {
  return (
    <SideBarContainer>
      <ProfileWrapper>profile</ProfileWrapper>
      <SideBarMenu>
        <SideBarItems />
      </SideBarMenu>
    </SideBarContainer>
  );
}
