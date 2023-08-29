// Import styled components
import { styled } from "styled-components";
import { EditSVG, PhoneSVG } from "../../../../static/icons/components";
import MailSVG from "../../../../static/icons/social/MailSVG";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import redux
import { useSelector } from "react-redux";

// Main container which contains profile and side bar
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40%;
  max-width: 100%;
  background-image: var(--linear-primary);
  padding: 1rem 2rem 2rem 2rem;
  border-radius: 20px;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.desktop`
    flex-direction:row;
    
    &:hover {
      div:last-child {
        opacity: 1;
      }
  }
  `}

  ${respondTo.tv`
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
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  border: none;
  border-radius: 10%;
`;

// User name + User surname
const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

// User name + User surname
const HeaderText = styled.h1`
  width: 100%;
  text-align: center;
  color: var(--white);
  font-size: var(--medium-m);
  text-transform: capitalize;

`;

const IconContainer = styled.div`
  cursor: pointer;
  right: 0;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: var(--medium-s);
    height: var(--medium-s);
    transition: fill 0.1s ease-in-out;
  }

  &:hover {
    svg {
      ${respondTo.desktop`
        fill:var(--whiteWithOpacity);
      `}

      ${respondTo.tv`
        fill:var(--whiteWithOpacity);
      `}
    }
  }
`;

// Container for user details
const Body = styled.div`
  width: 100%;
  display: flex;
  gap: calc(var(--medium-s) * 5);
  justify-content: space-between;

  ${respondTo.mobile`
    gap:0;
    flex-direction:column;
    justify-content: space-between;
  `}

  ${respondTo.lowTablet`
    gap:0;
    flex-direction:column;
    justify-content: space-between;
  `}
`;

// Item of Container
const Item = styled.div`
  display: flex;
  width: max-content;

  color: var(--white);
  text-transform: capitalize;
`;

const Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 0.5rem;

  svg {
    width: var(--small-l);
    height: var(--small-l);

    ${(props) =>
      props.$phone &&
      "margin-bottom:0.1rem;width: var(--small-m); height: var(--small-m);"}
  }
`;

const Text = styled.p`
  word-break: break-all;
  font-size: var(--small-l);
`;

// Export profile details component
function Profile({ t, navigate }) {
  // Get user
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <InnerContainer>
        <Header>
          <HeaderText>{user.first_name + " " + user.last_name}</HeaderText>

          <IconContainer onClick={() => navigate("/profile/update")}>
            <EditSVG />
          </IconContainer>
        </Header>

        <Body>
          <Item>
            <Label $phone>
              <PhoneSVG />
            </Label>
            <Text> {user.phone}</Text>
          </Item>

          <Item>
            <Label>
              <MailSVG />
            </Label>
            <Text> {user.email}</Text>
          </Item>
        </Body>
      </InnerContainer>
    </Container>
  );
}

export default Profile;
