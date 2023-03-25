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

function AuthorizationScreen() {
  // hooks
  const [page, setPage] = useState("login");
  const [message, setMessage] = useState("");

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
              />
            )}
            {page === "register" && (
              <Register
                user={user}
                error={errorRegister}
                success={registerSuccess}
                loading={loadingRegister}
                changer={changer}
              />
            )}
            {page === "forgot" && (
              <ForgotForm
                user={user}
                changer={changer}
                styles={styles}
              />
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
