// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Import components
import Form from "./components/Form";
import { LoaderMini, ErrorMessage } from "../../../components";
// Import actions
import { reset } from "../../../toolkit/user/userUpdateSlice";

const Container = styled.div`
  margin: 10rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  min-width: 30rem;
  align-items: center;
  border-radius: 20px;

  background-color: var(--white);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${respondTo.mobile`
    width:100vw;
    margin: 0rem;
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.lowTablet`
    width:100vw;
    margin: 0rem;
    box-shadow:none;
    background:transparent;
  `}
`;

const Header = styled.h1`
  text-align: center;
  font-size: var(--medium-s);
  color: var(--color-primary);
`;

const LoaderContainer = styled.div`
  margin: 3rem 0;
`;

const ErrorContainer = styled.div`
  * {
    margin: 0;
    stroke: var(--red);
    color: var(--red);
    background: transparent;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

// Export profile page
function Profile() {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFirstPage, setIsFirstPage] = useState(true);
  const { t } = useTranslation(["auth"]);

  // Get user from store
  const { user } = useSelector((state) => state.user);
  // Get update user
  const userUpdateSlice = useSelector((state) => state.userUpdate);
  const { isLoading, success, error } = userUpdateSlice;

  useEffect(() => {
    if (success) navigate("/profile");
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, navigate]);

  return (
    <Container>
      {isFirstPage ? (
        <Header className="w3-animate-left">
          {t("edit profile.edit profile")}
        </Header>
      ) : (
        <Header className="w3-animate-right">
          {t("edit profile.change password")}
        </Header>
      )}

      {!isLoading && error && (
        <ErrorContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </ErrorContainer>
      )}

      {isLoading ? (
        <LoaderContainer>
          <LoaderMini color="darkmagenta" />
        </LoaderContainer>
      ) : (
        user && (
          <Form
            t={t}
            user={user}
            isFirstPage={isFirstPage}
            setIsFirstPage={setIsFirstPage}
          />
        )
      )}
    </Container>
  );
}

export default Profile;
