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

  const { t } = useTranslation(["app"]);

  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.user);

  const changer = (pageName) => {
    setPage(pageName);
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <article className={styles.container}>
      {!isLoading && (
        <>
          <section className="w3-animate-left">
            {page === "login" && (
              <LoginForm
                styles={styles}
                changer={changer}
                error={error}
                t={t}
              />
            )}
            {page === "register" && <Register t={t} changer={changer} />}
            {page === "forgot" && (
              <ForgotForm user={user} changer={changer} styles={styles} t={t} />
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
