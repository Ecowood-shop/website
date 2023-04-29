// REACT
import React from "react";
import ReactDOM from "react-dom/client";

// APP
import App from "./App";

// REDUX
import store from "./store/store";
import { Provider } from "react-redux";

// ADDITIONAL
import "./index.scss";
import "animate.css";

// I18NEXT
import "./i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
