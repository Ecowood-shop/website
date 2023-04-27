// react
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// components
import BlockCarousel from "./carousel/BlockCarousel";
import Register from "./register/Register";
import LoginForm from "./login/LoginForm";
import ForgotForm from "./forgot/ForgotForm";

// styles
import styles from "./styles/styles.module.scss";
// redux
import { useSelector } from "react-redux";
// translate
import { useTranslation } from "react-i18next";
function AuthorizationScreen() {
  // hooks
  const [page, setPage] = useState("login");
  const [message, setMessage] = useState("");

  const { t } = useTranslation(["app"]);

  const navigate = useNavigate();
  const User = useSelector((state) => state.User);
  const {
    errorLogin,
    errorRegister,
    loadingRegister,
    loadingUser: loading,
    user,
    registerSuccess,
  } = User;

  const changer = (pageName) => {
    setPage(pageName);
  };

  useEffect(() => {
    if (errorLogin) {
      setMessage(errorLogin);
    }
    if (user) {
      navigate("/", { replace: true });
    }
  }, [errorLogin, user, navigate]);

  return (
    <article className={styles.container}>
      {!loading && (
        <>
          <section className="w3-animate-left">
            {page === "login" && (
              <LoginForm
                loading={loading}
                styles={styles}
                changer={changer}
                message={message}
                t={t}
              />
            )}
            {page === "register" && (
              <Register
                t={t}
                user={user}
                error={errorRegister}
                success={registerSuccess}
                loading={loadingRegister}
                changer={changer}
              />
            )}
            {page === "forgot" && (
              <ForgotForm user={user} changer={changer} styles={styles} t={t}/>
            )}
          </section>
          <section className={styles.carousel}>
            <BlockCarousel />
          </section>
        </>
      )}
    </article>
  );
}

export default AuthorizationScreen;
