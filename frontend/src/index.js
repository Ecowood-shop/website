// React
import React from "react";
import ReactDOM from "react-dom/client";

// Application
import App from "./App";

// Redux
import store from "./store/store";
import { Provider } from "react-redux";

// Styles
import "./index.scss";
import "animate.css";

// i18next
import "./i18next";

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
