// REACT
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SCREENS

//   APP
import Authorization from "./screens/app/authorization/AuthorizationScreen";



// COMPONENTS
import Header from "./components/header/Header";

// LAYOUTS
import HomeLayout from "./layouts/HomeLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/authorization" element={<Authorization />} />
        </Route>

        <Route element={<AuthorizedLayout />}>
          <Route path="/profile" element={<Authorization/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
