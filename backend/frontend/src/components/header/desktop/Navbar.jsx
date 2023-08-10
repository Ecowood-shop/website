// Import styled components
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import navigate
import { useNavigate } from "react-router-dom";
// Import translate
import { useTranslation } from "react-i18next";

// Import components
import Profile from "./components/Profile";
import Search from "../components/search/Search";

// Main container
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.375rem;
  padding: 0.5rem 10%;

  ${respondTo.tv`
    padding: 0.5rem 0;
    max-width: 1400px;
  `}
`;

// Altax text
const AltaxText = styled.h1`
  cursor: pointer;
  // Self position
  color: var(--white);
  font-size: var(--medium-m);
  transition: color 0.1s ease-in-out;

  &:hover {
    color: var(--whiteWithOpacity);
  }
`;

function Navbar({ user }) {
  // Get hooks
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["components"]);

  return (
    <Container className="w3-animate-right">
      <AltaxText onClick={() => navigate("/")}>altax</AltaxText>
      <Search t={t} i18n={i18n} isDesktop={true} />
      <Profile user={user} t={t} />
    </Container>
  );
}

export default Navbar;
