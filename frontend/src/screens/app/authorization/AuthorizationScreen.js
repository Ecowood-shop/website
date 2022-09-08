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
import { login } from "../../../store/actions/systemActions";

// OTHERS
import "./authorization.css";

function AuthorizationScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const systemUser = useSelector((state) => state.systemUser);
  const { error, loading, user } = systemUser;

  useEffect(() => {
    if (error) {
      setMessage(error);
    }
    if (user) {
      navigate("/", { replace: true });
    }
  }, [systemUser, navigate]);

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
    <article className="auth-article">
      <section className="auth-container  w3-animate-left">
        {isLogin ? (
          <form className="w3-animate-left" onSubmit={SubmitHandler}>
            <h1 style={{ marginBottom: message ? "0" : "3rem" }}>
              {" "}
              ავტორიზაცია
            </h1>
            <Message>{message}</Message>
            {loading && <Loader />}
            <section>
              <input
                type="email"
                className="auth-input"
                placeholder="მეილი"
                value={email ? email : ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="auth-input"
                placeholder="პაროლი"
                value={password ? password : ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
            <div className="auth-btn-container">
              <h2 onClick={() => setIsLogin(!isLogin)}>რეგისტრაცია</h2>
              <button type="submit" onClick={() => Validation()}>
                შესვლა
              </button>
            </div>
          </form>
        ) : (
          <Register
            systemUser={systemUser}
            ChangeLogin={() => {
              setIsLogin(!isLogin);
            }}
          />
        )}
      </section>
      <section className="auth-carousel">
        {" "}
        <BlockCarousel />
      </section>
    </article>
  );
}

export default AuthorizationScreen;
