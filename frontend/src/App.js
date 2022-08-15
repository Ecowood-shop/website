// REACT
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SCREENS

//   APP
import LoginScreen from "./screens/app/LoginScreen";
import RegisterScreen from "./screens/app/RegisterScreen";

// LAYOUTS
import HomeLayout from "./layouts/HomeLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/Register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
        </Route>

        <Route element={<AuthorizedLayout />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
