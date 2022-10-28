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
import Error from "./screens/app/error/Error"

// ADMIN
import ProductsScreen from "./screens/admin/products/ProductsScreen";
import UsersScreen from "./screens/admin/users/UsersScreen";
import ProductScreen from "./screens/admin/edit/product/Product";
import UserScreen from "./screens/admin/edit/user/User";
import CreateProductScreen from "./screens/admin/create/product/Product";
import Variants from "./screens/admin/variants/Variants";
import Images from "./screens/admin/images/Images";

// AUTHORIZED
import Cart from "./screens/auth/cart/Cart";
import Profile from "./screens/auth/profile/Profile";
import ProfileUpdate from "./screens/auth/edit/Profile";
import ShippingMethod from "./screens/auth/checkout/shippingMethod/ShippingMethod";
import ShippingDetails from "./screens/auth/checkout/shippingDetails/ShippingDetails";
import PaymentMethod from "./screens/auth/checkout/paymentMethod/PaymentMethod";

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
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route element={<AuthorizedLayout />}>
            <Route path="/profile" element={<Profile />} />
           
            <Route
              path="/checkout/shippingmethod"
              element={<ShippingMethod />}
            />
            <Route
              path="/checkout/shippingdetails"
              element={<ShippingDetails />}
            />
            <Route
              path="/checkout/paymentmethod"
              element={<PaymentMethod />}
            />
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
            <Route path="/admin/products/:id/images/" element={<Images />} />
            <Route path="/admin/users" element={<UsersScreen />} />
            <Route path="/admin/users/:id/edit" element={<UserScreen />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
