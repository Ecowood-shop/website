// REACT
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MessengerCustomerChat from "react-messenger-customer-chat";
// SCREENS

//   APP
import Authorization from "./screens/app/authorization/AuthorizationScreen";
import HomeScreen from "./screens/app/home/HomeScreen";
import About from "./screens/app/about/About";
import Products from "./screens/app/products/Products";
import Product from "./screens/app/product/Product";
import Order from "./screens/auth/order/Order";
import Error from "./screens/app/error/Error";
import Verification from "./screens/app/verification/Verification";
import ResetPassword from "./screens/app/reset-password/ResetPassword";

// ADMIN
import ProductsScreen from "./screens/admin/products/ProductsScreen";
import UsersScreen from "./screens/admin/users/UsersScreen";
import ProductScreen from "./screens/admin/edit/product/Product";
import UserScreen from "./screens/admin/edit/user/User";
import OrderScreen from "./screens/admin/orders/OrderScreen";
import CreateProductScreen from "./screens/admin/create/product/Product";
import CategoryScreen from "./screens/admin/categories/CategoryScreen";
import CreateCategoryScreen from "./screens/admin/create/category/CreateCategoryScreen";
import Category from "./screens/admin/edit/category/Category";
import Variants from "./screens/admin/variants/Variants";
import Images from "./screens/admin/images/Images";
import CitiesScreen from "./screens/admin/cities/CitiesScreen";
import CreateCityScreen from "./screens/admin/create/city/CreateCityScreen";
import UpdateCityScreen from "./screens/admin/edit/city/UpdateCityScreen";
import DiscountsScreen from "./screens/admin/specificDiscounts/DiscountsScreen";
import DiscountScreen from "./screens/admin/edit/specificDiscount/SpecificDiscount";
import CreateDIscountScreen from "./screens/admin/create/specificDiscount/SpecificDiscount";
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
import Translate from "./components/translate/Translate";
import ScrollToTop from "./components/scroll/ScrollToTop";

// LAYOUTS
import HomeLayout from "./layouts/HomeLayout";
import AuthorizedLayout from "./layouts/AuthorizedLayout";
import AdminLayout from "./layouts/AdminLayout";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./store/actions/userActions";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const { user, loadingUser } = User;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Suspense fallback={null}>
      <Router>
        <ScrollToTop>
          <Header user={user} />
          <Translate />
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/authorization" element={<Authorization />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/products/search" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/verification/:id/:token"
                element={<Verification />}
              />
              <Route
                path="password-reset/:id/:token"
                element={<ResetPassword />}
              />
            </Route>

            <Route
              element={<AuthorizedLayout user={user} loading={loadingUser} />}
            >
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
              <Route path="/order/:id/" element={<Order />} />
            </Route>

            <Route element={<AdminLayout user={user} loading={loadingUser} />}>
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
              <Route path="/admin/categories" element={<CategoryScreen />} />
              <Route path="/admin/categories/:id/edit" element={<Category />} />
              <Route
                path="/admin/categories/create"
                element={<CreateCategoryScreen />}
              />
              <Route path="/admin/users" element={<UsersScreen />} />
              <Route path="/admin/users/:id/edit" element={<UserScreen />} />
              <Route path="/admin/discounts" element={<DiscountsScreen />} />
              <Route
                path="/admin/discounts/:id/edit"
                element={<DiscountScreen />}
              />
              <Route
                path="/admin/discounts/create"
                element={<CreateDIscountScreen />}
              />
              <Route path="/admin/orders" element={<OrderScreen />} />
              <Route path="/admin/cities" element={<CitiesScreen />} />{" "}
              <Route
                path="/admin/cities/create"
                element={<CreateCityScreen />}
              />
              <Route
                path="/admin/cities/:id/edit"
                element={<UpdateCityScreen />}
              />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </ScrollToTop>

        {/*  <MessengerCustomerChat
    pageId="<PAGE_ID>"
    appId="<APP_ID>"
  />, */}
      </Router>
    </Suspense>
  );
}

export default App;
