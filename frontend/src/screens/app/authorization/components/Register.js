// REACT
import React, { useState, useEffect } from "react";

// COMPONENTS
import Message from "../../../../components/Message/Message";

// OTHERS
import { Animation } from "../../../../functions/Animation";

function Register(props) {
  const [nextPage, setNextPage] = useState(false);
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!message) {
      // dispatch(login(loginData, password));
      console.log(firstName, lastName, email, phone, password, confirmPassword);
    }
  };

  const Validation = () => {
    /[^A-Za-z0-9]+/.test(firstName) || !firstName
      ? setMessage("სახელი უნდა შეიცავდეს მხოლოდ სიმბილოებს და ციფრებს")
      : /[^A-Za-z0-9]+/.test(lastName) || !lastName
      ? setMessage("გვარი უნდა შეიცავდეს მხოლოდ სიმბილოებს და ციფრებს")
      : !email
      ? setMessage("შეიყვანეთ მეილი")
      : !phone
      ? setMessage("შეიყვანეთ ტელეფონის ნომერი")
      : password != confirmPassword
      ? setMessage("პაროლი არ ემთხვევა")
      : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
      ? setMessage(
          "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ და ერთ პატარა სიმბოლოს და ციფრს"
        )
      : setMessage("");
  };

  return (
    <form className="w3-animate-left" onSubmit={SubmitHandler}>
      <h1> რეგისტრაცია</h1>
      <Message>{message}</Message>
      {nextPage ? (
        <button
          className="blockCarousel-btn btn--left register-back"
          onClick={() => setNextPage(!nextPage)}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="btn-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      ) : (
        <button
          className="blockCarousel-btn btn--right register-back"
          type="button"
          onClick={() => {
            setNextPage(!nextPage);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="btn-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
      <section>
        {nextPage ? (
          <>
            <input
              type="tel"
              className="auth-input  w3-animate-right"
              placeholder="ტელეფონი"
              onChange={(e) => setPhone(e.target.value)}
              value={phone ? phone : ""}
            />
            <input
              type="password"
              className="auth-input  w3-animate-right"
              placeholder="პაროლი"
              onChange={(e) => setPassword(e.target.value)}
              value={password ? password : ""}
            />
            <input
              type="password"
              className="auth-input  w3-animate-right"
              placeholder="გაიმეორეთ პაროლი"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword ? confirmPassword : ""}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              className="auth-input  w3-animate-left"
              placeholder="სახელი"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName ? firstName : ""}
            />
            <input
              type="text"
              className="auth-input  w3-animate-left"
              placeholder="გვარი"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName ? lastName : ""}
            />
            <input
              type="email"
              className="auth-input  w3-animate-left"
              placeholder="მეილი"
              onChange={(e) => setEmail(e.target.value)}
              value={email ? email : ""}
              required
            />
          </>
        )}
      </section>

      {nextPage ? (
        <div className="auth-btn-container w3-animate-right">
          <h2 onClick={() => props.ChangeLogin()}>ავტორიზაცია</h2>
          <button type="submit" onClick={() => Validation()}>
            რეგისტრაცია
          </button>
        </div>
      ) : (
        <div className="auth-btn-container w3-animate-left">
          <h2 onClick={() => props.ChangeLogin()}>ავტორიზაცია</h2>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setNextPage(!nextPage);
            }}
          >
            შემდეგ
          </button>
        </div>
      )}
    </form>
  );
}

export default Register;
