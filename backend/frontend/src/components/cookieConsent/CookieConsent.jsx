// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../utils/styles/_respondTo";

// Import hooks
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  max-width: 50%;
  z-index: 1000;
  bottom: 1rem;
  position: fixed;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;

  padding: 1rem 2rem;
  border-radius: 20px;
  background-image: linear-gradient(
    326deg,
    rgba(164, 80, 139, 0.9) 0%,
    rgba(95, 10, 135, 0.9) 74%
  );

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.mobile`
    max-width:90%;
    padding-right:1rem;
  `}

  ${respondTo.lowTablet`
    max-width:90%;
  `}

  ${respondTo.tablet`
    max-width:70%;
  `}

  ${respondTo.laptop`
    max-width:70%;
  `}
`;

const Header = styled.div`
  ${respondTo.mobile`
    display:none;
  `}
`;
const HeaderText = styled.h3`
  margin: 0;

  color: var(--white);
  font-size: 1.4rem;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.p`
  color: var(--white);
  font-size: var(--small-m);

  &::first-letter {
    text-transform: capitalize;
  }
`;

const Link = styled.b`
  cursor: pointer;

  display: inline;
  color: var(--white);
  font-weight: bolder;
  font-size: var(--small-m);
  transition: color 0.1s ease-in-out;

  ${respondTo.desktop`
    &:hover{
      color:var(--whiteWithOpacity);
    }
  `}

  ${respondTo.tv`
    &:hover{
      color:var(--whiteWithOpacity);
    }
  `}
`;

const Button = styled.button`
  cursor: pointer;
  margin: 0 1rem;
  border: none;
  position: relative;
  bottom: 0.5rem;
  height: min-content;
  border-radius: 20px;
  padding: 0.5rem;

  color: var(--white);
  font-size: var(--small-m);
  text-transform: uppercase;
  background-color: var(--color-primary);
  transition: color 0.1s ease-in-out;

  ${respondTo.mobile`
    padding:0.5rem;
    margin:0;
    bottom:auto;
  `}

  ${respondTo.lowTablet`
    padding:0.5rem;
    margin-right:0;
  `}
  ${respondTo.tv`
    &:hover{
      color:var(--whiteWithOpacity);
    }
  `}

  ${respondTo.desktop`
    &:hover{
      color:var(--whiteWithOpacity);
    }
  `}
`;

// Export cookie consent popup component
const CookieConsent = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const { t } = useTranslation(["components"]);
  const [cookie, setCookie] = useCookies(["cookieConsent"]);

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
  };

  return (
    <Container className="w3-animate-bottom">
      <Header>
        <HeaderText>{t("cookie.cookie policy")}</HeaderText>
      </Header>

      <InnerContainer>
        <Text>
          {t(
            "cookie.cookies help us deliver our services. by using our services, you agree to our use of cookies. for more details please see"
          )}{" "}
          <Link onClick={() => navigate("terms-and-conditions#cookiePolicy")}>
            {t("cookie.cookie policy")}.
          </Link>
        </Text>
        <Button onClick={giveCookieConsent}>ok</Button>
      </InnerContainer>
    </Container>
  );
};

export default CookieConsent;
