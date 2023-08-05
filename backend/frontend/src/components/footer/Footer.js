// Import styled component
import styled from "styled-components";
import { CopyRightContainer, GridContainer } from "./style";
// translate
import { useTranslation } from "react-i18next";
// Import components
import Social from "./components/Social";
import Contact from "./components/Contact";
import Location from "./components/Location";
import Navigation from "./components/Navigation";

// Container
const Container = styled.div`
  margin-top: auto;
  width: 100%;
  background-image: var(--gradient-primary);
  min-height: 31.25rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Export footer component
function Footer() {
  const { t } = useTranslation(["components"]);

  return (
    <Container>
      <GridContainer className="w3-animate-right">
        {/* Columns */}
        <Navigation t={t} />
        <Social t={t} />
        <Contact t={t} />
        <Location t={t} />
      </GridContainer>

      {/* CopyRight */}
      <CopyRightContainer className="w3-animate-right">
        Copyright &copy; 2022 Altax.ge. All rights reserved.
      </CopyRightContainer>
    </Container>
  );
}

export default Footer;
