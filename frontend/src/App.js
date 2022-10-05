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
import UserScreen from "./screens/admin/edit/user/User";
import CreateProductScreen from "./screens/admin/create/product/Product";
import Variants from "./screens/admin/variants/Variants";

// AUTHORIZED
import Cart from "./screens/auth/cart/Cart";
import Profile from "./screens/auth/profile/Profile";
import ProfileUpdate from "./screens/auth/edit/Profile";

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile/update" element={<ProfileUpdate />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin/products" element={<ProductsScreen />} />
            <Route
              path="/admin/products/create"
              element={<CreateProductScreen />}
            />
            <Route
              path="/admin/products/:id/edit"
              element={<ProductScreen />}
            />
             <Route
              path="/admin/products/:id/variants/"
              element={<Variants />}
            />
            <Route path="/admin/users" element={<UsersScreen />} />
            <Route path="/admin/users/:id/edit" element={<UserScreen />} />
 
          </Route>
        </Routes>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
