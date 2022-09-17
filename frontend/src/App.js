// REACT
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SCREENS

//   APP
import Authorization from "./screens/app/authorization/AuthorizationScreen";
import HomeScreen from "./screens/app/home/HomeScreen";
import About from "./screens/app/about/About";
import Products from "./screens/app/products/Products";
import Product from "./screens/app/product/Product";

// ADMIN
import ProductsScreen from "./screens/admin/products/ProductsScreen";
import UsersScreen from "./screens/admin/users/UsersScreen";
import ProductScreen from "./screens/admin/edit/product/Product";

// COMPONENTS
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/scroll/ScrollToTop";

// LAYOUTS
import HomeLayout from "./layouts/HomeLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/authorization" element={<Authorization />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products/search" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>

          <Route element={<AuthorizedLayout />}>
            <Route path="/profile" element={<HomeScreen />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin/products" element={<ProductsScreen />} />
            <Route path="/admin/products/:id" element={<ProductScreen />} />
            <Route path="/admin/users" element={<UsersScreen />} />
          </Route>
        </Routes>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
