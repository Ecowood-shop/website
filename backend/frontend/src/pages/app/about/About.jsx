// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// Import components
import Section from "./Section";
import { altax, express } from "./data/data";
// Import images
import ecowood from "../../../static/images/ecowood.jpg";

const Container = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 3rem 5rem 5rem 5rem;
  margin: 5rem 0;
  border-radius: 20px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.mobile`
      margin: 0;
      width:100%;
      padding:1rem 1rem 3rem 1rem;
      background:transparent;
      box-shadow:none;
  `}

  ${respondTo.lowTablet`
      margin: 0;
      width:100%;
      padding:1rem 1rem 3rem 1rem;
      background:transparent;
      box-shadow:none;
  `}

  ${respondTo.tablet`
      width:90%;
      padding:3rem;
  `}

  ${respondTo.laptop`
      padding:3rem;
  `}

  ${respondTo.tv`
    width:1400px;
  `}
`;

const Header = styled.h1`
  margin-bottom: 3rem;

  color: var(--black);
  font-size: var(--medium-m);
  text-transform: capitalize;

  ${(props) => props.$nomargin && "margin-bottom:0rem;"}

  ${respondTo.desktop`
    margin-bottom: 3rem;  
  `}

  ${respondTo.tv`
    margin-bottom: 3rem;
  `}
`;

const Image = styled.img`
  width: 100%;
  border-radius: 20px;
  height: 30rem;

  ${respondTo.mobile`
    height:20rem;
  `}

  ${respondTo.lowTablet`
    height:20rem;
  `}
`;

const Text = styled.p`
  max-width: 100%;
  margin: 3rem 0;
  text-align: justify;
  color: var(--black);
  font-size: var(--small-l);
`;

const SectionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// Export about page
function About() {
  // Initialize hooks
  const { t } = useTranslation(["app"]);
  const branchesRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash === "#branches" && branchesRef.current) {
        branchesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <Container className={"w3-animate-right"}>
      <Header>{t("about.header")}</Header>
      <Image src={ecowood} alt="ecowood" />
      <Text>{t("about.text")}</Text>

      <Header id="branches" ref={branchesRef} $nomargin>
        {t("about.branches")}
      </Header>

      <SectionContainer>
        <Section company={altax(t)} />
        <Section company={express(t)} />
      </SectionContainer>
    </Container>
  );
}

export default About;
