import styled from "styled-components";
import SideBarItems from "./SideBarItems";
import Profile from "./Profile";
import { Link } from "react-router-dom";
const SideBarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  width: 200px;
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
  border: 1px solid black;
  height: 80%;
`;
//위에 스타일컴포넌트 상속?전달? 이거 써서 간단하게 만들어보기
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
