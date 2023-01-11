// REACT
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import BlockCarousel from "./components/BlockCarousel";
import Register from "./components/Register";
import Message from "../../../components/Message/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/userActions";

// OTHERS
import styles from "./styles.module.scss";

function AuthorizationScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const User = useSelector((state) => state.User);
  const {
    errorLogin,
    errorRegister,
    loadingRegister,
    loadingUser: loading,
    user,
    registerSuccess,
  } = User;

  useEffect(() => {
    if (errorLogin) {
      setMessage(errorLogin);
    }
    if (user) {
      navigate("/", { replace: true });
    }
  }, [errorLogin, user, navigate]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!message) {
      dispatch(login(email, password));
    }
  };

  const Validation = () => {
    !email
      ? setMessage("შეიყვანეთ მეილი")
      : !password
      ? setMessage("შეიყვანეთ პაროლი")
      : setMessage("");
  };

  return (
    <article className={styles.container}>
      {!loading && (
        <>
          <section className="w3-animate-left">
            {isLogin ? (
              <form className="w3-animate-left" onSubmit={SubmitHandler}>
                <h1 style={{ marginBottom: message ? "0" : "3rem" }}>
                  {" "}
                  ავტორიზაცია
                </h1>

                <Message styles>{message}</Message>

                {loading && <Loader />}
                <section>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="მეილი"
                    value={email ? email : ""}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className={styles.input}
                    placeholder="პაროლი"
                    value={password ? password : ""}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </section>
                <div className={styles.btnContainer}>
                  <h2 onClick={() => setIsLogin(!isLogin)}>რეგისტრაცია</h2>
                  <button
                    type="submit"
                    onClick={() => Validation()}
                    className={styles.btn}
                  >
                    შესვლა
                  </button>
                </div>
              </form>
            ) : (
              <Register
                user={user}
                error={errorRegister}
                success={registerSuccess}
                loading={loadingRegister}
                Loader={<Loader />}
                ChangeLogin={() => {
                  setIsLogin(!isLogin);
                }}
              />
            )}
          </section>
          <section className={styles.carousel}>
            {" "}
            <BlockCarousel />
          </section>
        </>
      )}
    </article>
  );
}

export default AuthorizationScreen;
