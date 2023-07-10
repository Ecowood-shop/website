// Import lazy load
import { lazyLoadComponent } from "../../utils/lazyLoad/LazyLoad";

/* Lazily loaded pages */
// Home
const HomePage = lazyLoadComponent(() => import("../app/home/HomeScreen"));

// Authorization
const AuthorizationPage = lazyLoadComponent(() =>
  import("../app/authorization/AuthorizationScreen")
);

// About
const AboutPage = lazyLoadComponent(() => import("../app/about/About"));

// Products
const ProductsPage = lazyLoadComponent(() =>
  import("../app/products/Products")
);

const ProductPage = lazyLoadComponent(() => import("../app/product/Product"));

// Cart
const CartPage = lazyLoadComponent(() => import("../auth/cart/Cart"));

// Verification
const VerificationPage = lazyLoadComponent(() =>
  import("../app/verification/Verification")
);

// Reset Password
const ResetPasswordPage = lazyLoadComponent(() =>
  import("../app/reset-password/ResetPassword")
);

// Error
const ErrorPage = lazyLoadComponent(() => import("../app/error/Error"));

// Export lazy Public pages
export const lazyPublicPages = {
  HomePage,
  AuthorizationPage,
  AboutPage,
  ProductsPage,
  ProductPage,
  CartPage,
  VerificationPage,
  ResetPasswordPage,
  ErrorPage,
};
