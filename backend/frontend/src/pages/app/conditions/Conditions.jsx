// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import components
import CookiePolicyEng from "./components/eng/CookiePolicy";
import CookiePolicyGeo from "./components/geo/CookiePolicy";
import CookiePolicyRus from "./components/rus/CookiePolicy";

// Import hooks
import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
      padding:1rem;
      background:transparent;
      box-shadow:none;
  `}

  ${respondTo.lowTablet`
      margin: 0;
      width:100%;
      padding:1rem;
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
  color: var(--black);
  font-size: var(--medium-m);
`;

function Conditions() {
  // Initialize hooks
  const { t, i18n } = useTranslation(["components"]);

  const cookieRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.hash === "#cookiePolicy" && cookieRef.current) {
        cookieRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [location]);
  return (
    <Container>
      <Header>{t("footer.conditions of use")}</Header>

      {i18n.language.toLowerCase() === "eng" && (
        <>
          <CookiePolicyEng cookieRef={cookieRef} />
        </>
      )}
      {i18n.language.toLowerCase() === "geo" && (
        <>
          <CookiePolicyGeo cookieRef={cookieRef} />
        </>
      )}
      {i18n.language.toLowerCase() === "rus" && (
        <>
          <CookiePolicyRus cookieRef={cookieRef} />
        </>
      )}
    </Container>
  );
}

export default Conditions;
