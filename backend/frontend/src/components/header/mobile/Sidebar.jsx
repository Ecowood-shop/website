// Import styled components
import { styled } from "styled-components";
import { CloseSVG } from "../../../static/icons/components";
import { AltaxText, CloseIconContainer, Header } from "./components/style";

// Import hooks
import { useEffect } from "react";
// Import components
import Dropdown from "./components/Dropdown";
import AuthText from "./components/AuthText";

// Main container
const Container = styled.div`
  top: 0;
  right: 0;
  z-index: 1001;
  position: fixed;

  height: 100%;
  width: 100%;
  overflow: scroll;
  background-image: var(--gradient-primary);
`;

// Inner container
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

// Export sidebar popup
function Sidebar({ t, i18n, navigate, user, closeMenu }) {

  // Freeze background moving
  useEffect(() => {
    setTimeout(() => {
      document.body.style.position = "fixed";
    }, 100);
    return () => {
      document.body.style.position = "relative";
    };
  }, []);

  return (
    <Container className="w3-animate-right">
      <InnerContainer>
        {/* Header component */}
        <Header>
          <AltaxText>altax</AltaxText>
          <CloseIconContainer onClick={closeMenu}>
            <CloseSVG />
          </CloseIconContainer>
        </Header>

        {/* DropDown menu*/}
        <Dropdown
          t={t}
          i18n={i18n}
          navigate={navigate}
          closeMenu={closeMenu}
          user={user}
        />

        {/* Show log in or log out */}
        <AuthText t={t} navigate={navigate} closeMenu={closeMenu} user={user} />
      </InnerContainer>
    </Container>
  );
}

export default Sidebar;
