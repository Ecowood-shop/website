// Import styled components
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import redux
import { useSelector } from "react-redux";

// Main container which contains profile and side bar
const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${respondTo.desktop`
    flex-direction:row;
    
    &:hover {
      div:last-child {
        opacity: 1;
      }
  }
  `}
`;

// Container for profile details
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  gap: 2rem;
  padding: 3rem 4rem;

  color: var(--white);
  border: none;
  border-radius: 10%;
  background-image: var(--gradient-primary);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  ${respondTo.mobile`
    padding:2rem 3rem;
    gap:1rem
  `}
`;

// User name + User surname
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: capitalize;
  font-size: var(--medium-m);
`;

// Container for user details
const Body = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  ${respondTo.mobile`
    grid-template-columns: repeat(1, 1fr);

    & div:nth-child(2){
      order:3
    }
    & div:nth-child(4){
      order:3
    }
  `}

  ${respondTo.lowTablet`
    grid-template-columns: repeat(1, 1fr);

    & div:nth-child(2){
      order:3
    }
    & div:nth-child(4){
      order:3
    }
  `}
`;

// Item of Container
const Item = styled.div`
  display: flex;

  color: var(--white);
  text-transform: capitalize;
  word-break: break-all;
`;

const Label = styled.p`
  white-space: nowrap;
  overflow: visible;

  font-size: var(--small-l);
  color: var(--whiteWithOpacity);

  ${respondTo.mobile`
    margin-left:0;
    width:40%;
  `}

  ${respondTo.lowTablet`
    margin-left:0;
    width:30%;
  `}
`;

const Text = styled.p`
  width: 60%;
  margin-left: 1rem;

  font-size: var(--small-l);
`;

// SideBar
const SideBar = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;

  ${respondTo.desktop`
    opacity: 0;
    cursor: pointer;
    align-items:center;
    justify-content: flex-start;
    transition: opacity 0.1s ease-in-out;
      
    :hover {
      opacity: 1;
    }
  `}
`;

// SideBar text
const SideText = styled.p`
  width: 80%;
  padding: 0.3rem 0 0.5rem 0;
  border: none;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  color: var(--white);

  text-align: center;
  text-transform: uppercase;
  font-size: var(--small-m);
  background-color: var(--color-primary);

  ${respondTo.desktop`
    width:fit-content;
    padding: 2rem 0.5rem 2rem 0.3rem;
    border-radius: 0 100px  100px 0;

    writing-mode: vertical-rl;
    text-orientation: mixed;
    transition: color 0.1s ease-in-out;

    &:hover {
      color: var(--whiteWithOpacity);
    }
  `}
`;

// Export profile details component
function Profile({ t, navigate }) {
  // Get user
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <InnerContainer>
        <Header>{user.first_name + " " + user.last_name}</Header>
        <Body>
          <Item>
            <Label>{t("profile.first name")}:</Label>
            <Text> {user.first_name}</Text>
          </Item>
          <Item>
            <Label>{t("profile.phone")}:</Label>
            <Text> {user.phone}</Text>
          </Item>
          <Item>
            <Label>{t("profile.last name")}:</Label>
            <Text> {user.last_name}</Text>
          </Item>
          <Item>
            <Label>{t("profile.email")}:</Label>
            <Text> {user.email}</Text>
          </Item>
        </Body>
      </InnerContainer>

      {/* Sidebar */}
      <SideBar>
        <SideText onClick={() => navigate("/profile/update")}>
          {t("profile.edit")}
        </SideText>
      </SideBar>
    </Container>
  );
}

export default Profile;
