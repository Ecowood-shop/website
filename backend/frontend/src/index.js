// React
import ReactDOM from "react-dom/client";

// Import Application
import App from "./App";

// Import Redux toolkit
import store from "./store/store";
import { Provider } from "react-redux";
import { injectStore } from "./utils/hooks/useAxios";

// Import styles
import "animate.css";

// Import i18next translate
import "./i18next";

// Inject store into axios interceptors
injectStore(store);

// Render the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
