// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// import hooks
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// Import components
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import BlockCarousel from "./components/carousel/BlockCarousel";
import ForgotPassword from "./components/forgot/ForgotPassword";

const Container = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--linear-primary);
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rem 5rem;
  flex-direction: column;

  ${respondTo.mobile`
    padding:5rem;
  `}

  ${respondTo.lowTablet`
    padding:10rem 5rem;
  `}

  ${respondTo.tablet`
    padding:10rem 5rem;
  `}
  

  ${respondTo.desktop`
    flex-direction:row;
  `}

  ${respondTo.tv`
    width:1800px;
    flex-direction:row;
  `}

  @media screen and (max-width:1800px) {
    flex-direction: column;
  }
`;

const Table = styled.div`
  padding: 3rem 5rem;
  border-radius: 10%;
  position: relative;
  background: var(--linear-primary);

  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.mobile`
    padding:0;
    box-shadow: none;
    background: transparent;
  `}

  ${respondTo.lowTablet`
    padding:0;
    box-shadow: none;
    background: transparent;
  `}
`;

const CarouselContainer = styled.div`
  display: none;
  margin-left: 0;
  margin-top: 10rem;

  ${respondTo.laptop`
    display:flex;
    margin-top: 0;
  `}

  @media screen and (min-width: 1799px) {
    display: flex;
    margin-top: 0;
    margin-left: auto;
  }
`;

// Export authorization page
function AuthorizationScreen() {
  // Initialize hooks
  const [page, setPage] = useState("login");
  const { t } = useTranslation(["app"]);
  const navigate = useNavigate();

  // Get user from user slice
  const { user } = useSelector((state) => state.user);

  const pageChanger = (pageName) => {
    setPage(pageName);
  };

  // If user navigate to main page
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container>
      <InnerContainer>
        <Table className="w3-animate-left">
          {page === "login" && <Login pageChanger={pageChanger} t={t} />}
          {page === "register" && <Register pageChanger={pageChanger} t={t} />}
          {page === "forgot" && (
            <ForgotPassword pageChanger={pageChanger} t={t} />
          )}
        </Table>
        <CarouselContainer>
          <BlockCarousel t={t} />
        </CarouselContainer>
      </InnerContainer>
    </Container>
  );
}

export default AuthorizationScreen;
