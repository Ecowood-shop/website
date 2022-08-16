import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";

// import Loader from "../../components/Loader"

// COMPONENTS
import BlockCarousel from "./components/BlockCarousel";
import Register from "./components/Register";
import Message from "../../../components/Message/Message";

// OTHERS
import "./authorization.css";

function AuthorizationScreen() {
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!message) {
      // dispatch(login(loginData, password));
      console.log(email + password);
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
        {login ? (
          <form className="w3-animate-left" onSubmit={SubmitHandler}>
            <h1> ავტორიზაცია</h1>
            <Message>{message}</Message>

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
              <h2 onClick={() => setLogin(!login)}>რეგისტრაცია</h2>
              <button type="submit" onClick={() => Validation()}>
                შესვლა
              </button>
            </div>
          </form>
        ) : (
          <Register
            ChangeLogin={() => {
              setLogin(!login);
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
