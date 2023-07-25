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
  width: 100%;
  background-image: var(--gradient-primary);
  min-height: 500px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Export footer component
function Footer() {
  const { t } = useTranslation(["components"]);

  return (
    <Container className="w3-animate-right">
      <GridContainer>
        {/* Columns */}
        <Navigation t={t} />
        <Social t={t} />
        <Contact t={t} />
        <Location t={t} />
      </GridContainer>

      {/* CopyRight */}
      <CopyRightContainer>
        Copyright &copy; 2022 Altax.ge. All rights reserved.
      </CopyRightContainer>
    </Container>
  );
}

export default Footer;
