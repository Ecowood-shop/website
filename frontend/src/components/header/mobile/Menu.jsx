// Import styles
import { styled } from "styled-components";
import { headerIcons, componentIcons } from "../../../static/icons";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// Import components
import Sidebar from "./Sidebar";
import Search from "../components/search/Search";

// Main container
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  
`;

// Navbar container
const NavBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0.5rem 2vw;

  background-image: var(--gradient-primary);
`;

// Altax text
const AltaxText = styled.h1`
  // Styles
  color: var(--white);
  margin-left: 1vw;
  font-size: var(--large);

  ${respondTo.laptop`
     font-size: var(--medium-m);
  `}
`;

// Icon container
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.$isOpen &&
    "background-color:var(--white);border-radius:50%;padding:1px;svg{fill:var(--darkmagenta)}"}

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

// Right icons panel
const IconsPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  gap: 0.625rem;
`;

// Export Menu component
function Menu({ user }) {
  // create hooks
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["components"]);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // Destructure icons
  const { MenuSVG, SearchSVG } = headerIcons;
  const { CloseSVG } = componentIcons;

  return (
    <Container className="w3-animate-top">
      <NavBar>
        <AltaxText onClick={() => navigate("/")}>altax</AltaxText>

        <IconsPanel>
          {/* Show search icon which opens Search  */}
          <IconContainer
            $isOpen={isOpenSearch}
            onClick={() => setIsOpenSearch(!isOpenSearch)}
          >
            {!isOpenSearch ? <SearchSVG /> : <CloseSVG />}
          </IconContainer>

          {/* Show menu icon which opens Menu  */}
          <IconContainer onClick={() => setIsOpenMenu(!isOpenMenu)}>
            <MenuSVG />
          </IconContainer>
        </IconsPanel>
      </NavBar>

      {/* Show menu panel */}
      {isOpenMenu && (
        <Sidebar
          user={user}
          navigate={navigate}
          t={t}
          i18n={i18n}
          closeMenu={() => setIsOpenMenu(false)}
        />
      )}

      {/* Search component */}
      {isOpenSearch && <Search t={t} i18n={i18n} />}
    </Container>
  );
}

export default Menu;
