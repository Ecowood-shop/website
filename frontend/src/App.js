// REACT
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SCREENS

//   APP
import Authorization from "./screens/app/authorization/AuthorizationScreen";
import HomeScreen from "./screens/app/home/HomeScreen";


// COMPONENTS
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer"

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
          <Route path="/" element={<HomeScreen/>}/>
        </Route>

        <Route element={<AuthorizedLayout />}>
          <Route path="/profile" element={<Authorization/>} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
